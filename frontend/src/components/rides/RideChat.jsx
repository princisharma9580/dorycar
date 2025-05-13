
import React, { useEffect, useState, useRef } from "react";
import chatSocket from "../../services/chatSocket";
import { IoSend } from "react-icons/io5";
import rideService from "../../services/rideService";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import { format } from "date-fns";
import { toast } from "react-toastify";
// import PropTypes from 'prop-types';

const RideChat = ({open, closeChat, currentUser, rideId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingStatus, setTypingStatus] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
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
    error?.response?.data?.message || error?.message || "Failed to fetch messages";

  toast.error(message);
      }
    };

    fetchMessages();
  }, [rideId, currentUser]);

  useEffect(() => {
    if (!rideId || !currentUser) return;
  
    if (!chatSocket) {
      console.error("chatSocket is not initialized");
      return;
    }
  
    chatSocket.connect(currentUser.token);
    chatSocket.joinRideChat(rideId, currentUser?.user?._id);
       
const handleMessage = (data) => {
  if (!data || !data.sender || !data.content) {
    console.log("Invalid message data", data);
    return;
  }

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

  const isAtBottom =
    chatBoxRef.current &&
    chatBoxRef.current.scrollTop + chatBoxRef.current.clientHeight >=
      chatBoxRef.current.scrollHeight - 10;

  // Play notification sound
  if (!isCurrentUser && !isMuted) {
    notificationSound.play(); // ✅ Play sound when a new message is received
  }

  // Show toast notification
  if (!isCurrentUser) {
    toast.info(`📨 ${newMessage.senderName}: "${newMessage.content}"`);
  }

  // Browser Notification (show only if the page is not focused)
  if (!document.hidden) return; // Skip if the page is in focus

  if (Notification.permission === "granted") {
    new Notification("New Message", {
      body: `${newMessage.senderName}: "${newMessage.content}"`,
      icon: "/path/to/icon.png", // Add your app icon here
    });
  } else if (Notification.permission !== "denied") {
    // Request permission if not already denied
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("New Message", {
          body: `${newMessage.senderName}: "${newMessage.content}"`,
          icon: "/path/to/icon.png",
        });
      }
    });
  }

  // Update unread message count
  if (!isAtBottom) setUnreadCount((prev) => prev + 1);

  scrollToBottom();
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
  }, [rideId, currentUser, chatSocket]);
  

  useEffect(scrollToBottom, [messages]);

  const handleTyping = (e) => {
    if (e) e.preventDefault(); // prevent any unexpected behavior
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
      e.preventDefault(); // Prevent form submission or page reload
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
    <Dialog
      open={Boolean(rideId)}
      onClose={closeChat}
      PaperProps={{
        sx: {
          position: "fixed",
          bottom: 20,
          right: 20,
          m: 0,
          width: 300,
          height: 400,
          borderRadius: 2,
          zIndex: 9999,
        },
      }}
      hideBackdrop
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          background:
            "linear-gradient(to right, #f3bedc, #e9bde3, #dcbee8, #cebeed, #bebfef, #b2c4f3, #a6c9f4, #9ccdf4, #98d6f4, #9adff2, #a1e6ee, #adede9)",
        }}
        className="flex justify-between items-center"
      >
        <span className="capitalize">
          {currentUser?.user?.name || "Carpool Chat"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-xs px-2 py-1 rounded "
          >
            {isMuted ? (
              <NotificationsOffIcon sx={{ color: "#ecdd13" }} />
            ) : (
              <NotificationsIcon sx={{ color: "#ecdd13" }} />
            )}
          </button>
          <IconButton onClick={closeChat} sx={{ color: "gray" }}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent sx={{ padding: 0 }}>
        <div className="w-full h-full bg-white border rounded-xl shadow-xl flex flex-col">
          <div
            ref={chatBoxRef}
            onScroll={() => setUnreadCount(0)}
            className="flex-1 overflow-y-auto p-3 space-y-2"
          >
            {messages.map((msg, idx) => {
              const isMyMessage =
                (msg.sender?._id || msg.sender) === currentUser?.user?._id;

              return (
                <div
                  key={idx}
                  className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                    isMyMessage
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-200 text-black self-start"
                  }`}
                >
                  <div className="text-xs font-medium mb-1 capitalize flex justify-between">
                    <span>
                      {isMyMessage
                        ? "Me"
                        : msg.sender?.name || msg.senderName || "User"}
                    </span>
                    <span className="text-[10px] ml-2 text-gray-700">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                  <div>{msg.content || "No content"}</div>
                </div>
              );
            })}

            {typingStatus && (
              <div className="text-sm italic text-gray-500">{typingStatus}</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {unreadCount > 0 && (
            <div className="text-xs text-center text-white bg-red-500 py-1">
              {unreadCount} new message{unreadCount > 1 ? "s" : ""}
            </div>
          )}

          <div className="p-2 border-t flex items-center relative gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onInput={handleTyping}
              className="flex-1 border rounded-full px-3 py-1 text-sm focus:outline-none mx-1"
              placeholder="Type a message..."
            />

            <button
            type="button"
            onClick={(e) => handleSend(e)}  
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <IoSend />
              
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RideChat;

