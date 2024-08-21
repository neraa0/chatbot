"use client";
import { Box, Stack, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Function to generate responses based on user input
  const getResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      return "Hello! How can I help you today?";
    }
    if (lowerCaseMessage.includes("how are you")) {
      return "I'm just a program, so I don't have feelings, but I'm here to help!";
    }
    if (lowerCaseMessage.includes("what is your name")) {
      return "I'm the Headstarter Support Agent!";
    }
    if (lowerCaseMessage.includes("help")) {
      return "Sure, I'm here to help. What do you need assistance with?";
    }
    if (lowerCaseMessage.includes("thank you") || lowerCaseMessage.includes("thanks")) {
      return "You're welcome! If you have any more questions, feel free to ask.";
    }
    if (lowerCaseMessage.includes("hours") || lowerCaseMessage.includes("open")) {
      return "Our support team is available from 9 AM to 5 PM, Monday through Friday.";
    }
    if (lowerCaseMessage.includes("account") || lowerCaseMessage.includes("login")) {
      return "You can manage your account settings by logging into your dashboard and selecting 'Account Settings'.";
    }
    if (lowerCaseMessage.includes("forgot password")) {
      return "If you've forgotten your password, click on 'Forgot Password' on the login page, and we'll send you a reset link.";
    }
    if (lowerCaseMessage.includes("contact") || lowerCaseMessage.includes("support")) {
      return "You can contact us at support@headstarter.com or call us at (123) 456-7890.";
    }
    if (lowerCaseMessage.includes("pricing") || lowerCaseMessage.includes("cost")) {
      return "Our pricing plans are available on our website under the 'Pricing' section. Feel free to check them out!";
    }
    if (lowerCaseMessage.includes("what day is it")) {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      return `Today is ${today}.`;
    }

    return "I'm not sure how to respond to that. Could you please clarify or ask something else?";
  };

  // Function to handle sending messages
  const sendMessage = () => {
    if (!message.trim()) return; // Check if the message is not empty

    const newMessages = [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" }
    ];

    setMessages(newMessages); // Update state with the new message
    setMessage(""); // Clear the input field

    // Simulate a delay before responding
    setTimeout(() => {
      const response = getResponse(message);
      setMessages((prevMessages) => {
        let lastMessage = prevMessages[prevMessages.length - 1];
        return [
          ...prevMessages.slice(0, prevMessages.length - 1),
          {
            ...lastMessage,
            content: response,
          },
        ];
      });
    }, 1000); // 1 second delay to simulate thinking time
  };

  // Effect to send a greeting message when the component mounts
  useEffect(() => {
    const initialGreeting = {
      role: "assistant",
      content: "Hi, I'm the Headstarter Support Agent. How can I assist you today?"
    };
    setMessages([initialGreeting]);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}
            >
              <Box
                bgcolor={message.role === "assistant" ? "primary.main" : "secondary.main"}
                color="white"
                borderRadius={16}
                p={2}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
