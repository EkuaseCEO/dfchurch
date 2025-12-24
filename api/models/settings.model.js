import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
   facebook: {
    type: String,
   },
    image: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    postStatus: {
      type: String,
      default: 'Pending',
    },
      youtube: {
      type: String,
    },
      youtubelink: {
      type: String,
    },
    instagram: {
      type: String,
    },
    Aboutus: {
      type: String,
    },
    ourvision: {
      type: String,
    },
    ourbelief: {
      type: String,
    },
    churchaddress: {
      type: String,
    },
    ourmission: {
      type: String,
    },
    emailink: {
      type: String,
    },
    phonenumber: {
      type: String,
    }
  },
  { timestamps: true }
);

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;