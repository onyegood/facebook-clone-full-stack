const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
    text: true
  },
  last_name: {
    type: String,
    required: [true, "last name is required"],
    trim: true,
    text: true
  },
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    text: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  image: {
    type: String,
    default: ""
  },
  cover: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    required: [true, "gender is required"]
  },
  bYear: {
    type: Number,
    required: true,
    trim: true,
  },
  bDay: {
    type: Number,
    required: true,
    trim: true,
  },
  bMonth: {
    type: Number,
    required: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  friends: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  },
  follower: {
    type: Array,
    default: []
  },
  requests: {
    type: Array,
    default: []
  },
  search: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    }
  ],
  details: {
    bio: {
      type: String
    },
    otherName: {
      type: String
    },
    job: {
      type: String
    },
    workplace: {
      type: String
    },
    highSchool: {
      type: String
    },
    college: {
      type: String
    },
    currentCity: {
      type: String
    },
    hometown: {
      type: String
    },
    relationship: {
      type: String,
      enum: ['Single', 'In a relationship', 'Married', 'Divorced']
    },
    instagram: {
      type: String
    },
  },
  savedPost: [
    {
      post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
      },
      savedAt: {
        type: Date,
        default: new Date(),
      }
    }
  ]
}, {
  timestamp: true,
});

module.exports = mongoose.model('User', userSchema);
