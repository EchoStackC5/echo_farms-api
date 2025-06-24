import { User } from '../models/user_model.js';


export const getProfileNames = async (req, res) => {
  try {
    // The 'protect' middleware (or similar) should attach the authenticated user's ID to req.user.id
    const userId = req.user._id || req.user.id; // Or req.user._id, depending on how your middleware sets it

    // Find the user by ID and select only firstName and lastName
    const user = await User.findById(userId).select('firstName lastName -_id'); // -_id excludes the _id field

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName
    });

  } catch (error) {
    console.error('Error fetching user profile names:', error);
    res.status(500).json({ error: 'Server error while fetching profile data', details: error.message });
  }
};

// Optional: controller to get names by a specific ID (e.g., for admin)
export const getProfileNamesById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from URL parameters

    const user = await User.findById(id).select('firstName lastName -_id');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName
    });

  } catch (error) {
    console.error('Error fetching user profile names by ID:', error);
    res.status(500).json({ error: 'Server error while fetching profile data by ID', details: error.message });
  }
};