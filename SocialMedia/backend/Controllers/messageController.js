// messageController.js in controllers folder
const Message = require("../Model/MessageModel");

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;

    // Check if the required fields are provided
    if (!chatId || !senderId || !text) {
      return res.status(400).json({ error: 'chatId, senderId, and text are required' });
    }

    // Create a new message document
    const message = new Message({
      chatId,
      senderId,
      text,
    });

    // Save the message to the database
    const savedMessage = await message.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};




