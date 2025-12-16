import { Response } from 'express';
import { Message } from '../models/Message';
import { sendContactMessageToOwner, sendContactConfirmation } from '../utils/mailer';
import { ApiError } from '../utils/ApiError';

export const createMessage = async (
  req: any,
  res: Response
): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    // Save message to database
    const newMessage = new Message({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    // Send email to owner (non-blocking - log errors but don't fail)
    try {
      await sendContactMessageToOwner(name, email, subject, message);
    } catch (emailError) {
      console.error('Error sending owner email:', emailError);
      // Continue even if owner email fails
    }

    // Send confirmation email to user (non-blocking)
    try {
      await sendContactConfirmation(name, email);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Continue even if confirmation email fails
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: {
        id: newMessage._id,
      },
    });
  } catch (error: any) {
    console.error('Error creating message:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send message. Please try again later.',
    });
  }
};

export const getMessages = async (
  req: any,
  res: Response
): Promise<void> => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages.',
    });
  }
};

export const deleteMessage = async (
  req: any,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully.',
    });
  } catch (error: any) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete message.',
    });
  }
};
