import React, { useEffect, useState, useRef } from "react";
import chatSocket from "../../services/chatSocket";
import { IoSend } from "react-icons/io5";
import rideService from "../../services/rideService";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import { format } from "date-fns";
import { toast } from "react-toastify";

const RideChat = ({ open, closeChat, onOpenChat, currentUser, rideId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingStatus, setTypingStatus] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [inAppNotification, setInAppNotification] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const chatBoxRef = useRef(null);
  const notificationSound = new Audio("/ping.mp3");

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!rideId) return;

    const fetchMessages = async () => {
      try {
        const res = await rideService.getMessages(rideId);
        const enriched = res.map((msg) => ({
          ...msg,
          senderName:
            msg.sender === currentUser?.user?._id
              ? currentUser.user?.name
              : msg.senderName || "User",
          createdAt: msg.createdAt || msg.timestamp || new Date().toISOString(),
        }));
        setMessages(enriched);
      } catch (error) {
        console.error("Error fetching messages:", error);
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch messages";
        toast.error(message);
      }
    };

    fetchMessages();
  }, [rideId, currentUser]);

  // SOCKET CONNECTION & LISTENERS: always active, no conditional render around
  useEffect(() => {
    if (!rideId || !currentUser) return;
    if (!chatSocket) return;

    chatSocket.connect(currentUser.token);
    chatSocket.joinRideChat(rideId, currentUser?.user?._id);
    const handleMessage = (data) => {
      if (!data || !data.sender || !data.content) return;

      const senderId = data.sender._id || data.sender;
      const isCurrentUser = senderId === currentUser?.user?._id;

      const newMessage = {
        sender: senderId,
        content: data.content,
        createdAt: data.createdAt || data.timestamp || new Date().toISOString(),
        senderName: isCurrentUser
          ? currentUser?.user?.name
          : data.sender.name || data.senderName || "User",
      };

      setMessages((prev) => [...prev, newMessage]);

      if (!isCurrentUser && !isMuted) {
        notificationSound.play();
      }

      if (!isCurrentUser) {
        // Show in-app notification instead of toast
        setInAppNotification(
          `📨 ${newMessage.senderName}: "${newMessage.content}"`
        );

        // Hide after 4 seconds
        setTimeout(() => setInAppNotification(null), 4000);
      }

      if (document.hidden && Notification.permission === "granted") {
        new Notification("New Message", {
          body: `${newMessage.senderName}: "${newMessage.content}"`,
          icon: "/path/to/icon.png",
        });
      }

      const isAtBottom =
        chatBoxRef.current &&
        chatBoxRef.current.scrollTop + chatBoxRef.current.clientHeight >=
          chatBoxRef.current.scrollHeight - 10;

      // If chat closed OR not scrolled to bottom, increase unread count
      if (!open || !isAtBottom) setUnreadCount((prev) => prev + 1);

      // Only scroll to bottom if chat open and user is at bottom
      if (open && isAtBottom) scrollToBottom();
    };

    const handleTyping = ({ name }) => {
      if (name !== currentUser?.user?.name) {
        setTypingStatus(`Typing...`);
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setTypingStatus(""), 2000);
      }
    };

    chatSocket.setupListeners(handleMessage, handleTyping);

    return () => {
      chatSocket.leaveRideChat(rideId);
    };
  }, [rideId, currentUser, chatSocket, isMuted, open]);

  // Scroll to bottom when chat opens or messages update
  useEffect(() => {
    if (open) {
      // Use setTimeout 0 to wait for rendering, optional but can help
      setTimeout(() => {
        scrollToBottom();
        setUnreadCount(0);
      }, 0);
    }
  }, [open, messages]);

  const handleTyping = (e) => {
    if (e) e.preventDefault();
    chatSocket.sendTyping(rideId, currentUser?.user?._id);
  };

  const handleSend = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      sender: currentUser?.user?._id,
      rideId,
      content: input.trim(),
    };

    try {
      const sent = await rideService.sendMessage(rideId, newMessage);
      if (chatSocket?.sendMessage) {
        chatSocket.sendMessage(rideId, {
          ...sent,
          senderName: currentUser?.user?.name,
          createdAt: sent.createdAt || new Date().toISOString(),
        });
      }

      setInput("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to send message";
      toast.error(message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp) => {
    try {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      if (isNaN(date)) return "";
      return format(date, "p");
    } catch (err) {
      console.error("Invalid timestamp:", timestamp);
      return "";
    }
  };

  return (
    <>
      {/* In-app notification fixed at top */}
      {inAppNotification && (
        <div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 max-w-xs bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slideIn z-[99999] cursor-pointer select-none"
          role="alert"
          aria-live="assertive"
          onClick={() => {
            onOpenChat?.();
            setInAppNotification(null);
            setUnreadCount(0);
          }}
          title="Click to open chat"
          style={{ pointerEvents: "auto" }}
        >
          {inAppNotification}
        </div>
      )}

      <Dialog
        open={open}
        onClose={closeChat}
        PaperProps={{
          sx: {
            position: "fixed",
            bottom: 20,
            right: 20,
            m: 0,
            width: 300,
            height: 400,
            borderRadius: 3,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            bgcolor: "#fff",
            boxShadow: "0 8px 24px rgba(0, 128, 96, 0.25)", 
            boxShadow: "0 8px 30px seagreen",
          },
        }}
        hideBackdrop
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            background:
              "linear-gradient(to right, #1f9d55, #2ca985, #32bb93, #3cc79f, #46d1a7, #54dbae, #62e1b6, #6be6bc, #7ae9c3, #88ebca, #97edcf, #a1eece)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 700,
            fontSize: "1.15rem",
            color: "#fff",
            userSelect: "none",
          }}
        >
          <span className="capitalize">
            {currentUser?.user?.name || "Carpool Chat"}
          </span>
          <div className="flex items-center gap-1">
            <IconButton
              onClick={() => setIsMuted(!isMuted)}
              sx={{
                color: "#fff",
                transition: "color 0.3s",
                "&:hover": { color: "#d4e9e2" },
              }}
              size="small"
              aria-label={
                isMuted ? "Unmute notifications" : "Mute notifications"
              }
              title={isMuted ? "Notifications muted" : "Notifications active"}
            >
              {isMuted ? <NotificationsOffIcon /> : <NotificationsIcon />}
            </IconButton>
            <IconButton
              onClick={closeChat}
              sx={{ color: "#d4e9e2", ml: 0.5, "&:hover": { color: "#fff" } }}
              size="small"
              aria-label="Close chat"
              title="Close chat"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>

        <DialogContent
          sx={{
            flex: 1,
            p: 0,
            backgroundColor: "#f9fdfb",
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid #d2e7db",
            borderBottom: "1px solid #d2e7db",
            overflow: "hidden",
          }}
        >
          <div
            ref={chatBoxRef}
            onScroll={() => setUnreadCount(0)}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100"
            style={{ flexGrow: 1, minHeight: 0, paddingBottom: 40 }}
          >
            {messages.map((msg, idx) => {
              const isMyMessage =
                (msg.sender?._id || msg.sender) === currentUser?.user?._id;

              return (
                <div
                  key={idx}
                  className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm shadow-md break-words cursor-default select-text animate-fadeInUp ${
                    isMyMessage
                      ? "bg-green-600 text-white self-end ml-auto rounded-br-sm"
                      : "bg-white text-gray-900 self-start rounded-bl-sm border border-green-200"
                  }`}
                  style={{
                    wordBreak: "break-word",
                    animationFillMode: "both",
                    animationDuration: "0.35s",
                    animationTimingFunction: "ease-out",
                    animationDelay: `${idx * 0.05}s`,
                  }}
                  aria-live="polite"
                >
                  <div className="text-xs font-semibold mb-1 flex justify-between items-center">
                    <span>
                      {isMyMessage
                        ? "Me"
                        : msg.sender?.name || msg.senderName || "User"}
                    </span>
                    <span className="text-[10px] text-gray-600 ml-2 select-none">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                  <div>{msg.content || <em>No content</em>}</div>
                </div>
              );
            })}

            {typingStatus && (
              <div
                key={typingStatus}
                className="typing-indicator flex items-center space-x-1 px-4 italic text-green-700 select-none"
                aria-live="polite"
                style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}
              >
                <span className="whitespace-nowrap">{typingStatus}</span>
                {[0, 200, 400].map((delay, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      width: 6,
                      height: 6,
                      backgroundColor: "#16a34a",
                      borderRadius: "50%",
                      animation: "blink 1.4s infinite ease-in-out",
                      animationDelay: `${delay}ms`,
                    }}
                  />
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {unreadCount > 0 && !open && (
            <div
              className="fixed bottom-8 right-8 bg-green-600 text-white rounded-full px-4 py-2 cursor-pointer shadow-lg select-none z-50"
              onClick={() => {
                onOpenChat?.();
                scrollToBottom();
                setUnreadCount(0);
              }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === "Enter" && setUnreadCount(0)}
              aria-label={`You have ${unreadCount} new message${
                unreadCount > 1 ? "s" : ""
              }, click to open chat`}
              title="Click to open chat"
            >
              {unreadCount} new message{unreadCount > 1 ? "s" : ""}
            </div>
          )}
        </DialogContent>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(e);
          }}
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: "#ffffff",
            borderTop: "1px solid #d2e7db",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            onInput={handleTyping}
            placeholder="Type a message..."
            aria-label="Type a message"
            className="flex-grow border border-green-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            style={{ fontFamily: "inherit" }}
          />
          <IconButton
            type="submit"
            color="success"
            disabled={!input.trim()}
            aria-label="Send message"
            sx={{
              bgcolor: "green",
              "&:hover": { bgcolor: "darkgreen" },
              color: "#fff",
              p: 1.5,
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(0, 100, 0, 0.25)",
              transition: "transform 0.2s ease",
              "&:active": { transform: "scale(0.9)" },
            }}
          >
            <IoSend size={22} />
          </IconButton>
        </Box>
      </Dialog>
    </>
  );
};

export default RideChat;
