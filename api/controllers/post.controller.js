import Post from '../models/post.model.js';
import ProgramPost from '../models/programpost.model.js';
import Setting from '../models/settings.model.js';
import { errorHandler } from '../utils/error.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});



export const updateSetting = async (req, res, next) => {
  console.log(req.params.postIds)
  console.log(req.body)
  // if (!req.user.isAdmin || req.user.id !== req.params.userId) {
  //   return next(errorHandler(403, 'You are not allowed to update this post'));
  // } 
  try { 
    const updatedPost = await Setting.findByIdAndUpdate( 
      req.params.postIds,
      {
        $set: {
        content: req.body.content,
        facebook: req.body.facebook,
        youtube: req.body.youtube,
        instagram: req.body.instagram,
        Aboutus: req.body.Aboutus,
        ourmission: req.body.ourmission,
        ourvision: req.body.ourvision,
        churchaddress: req.body.churchaddress,
        ourbelief: req.body.ourbelief,
        youtubelink: req.body.youtubelink,
        emailink: req.body.emailink,
        phonenumber: req.body.phonenumber,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const programposting = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new ProgramPost({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};





export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};


export const getSettings = async (req, res, next) => {
  try {
     const Settings = await Setting.find()
    

    const totalPosts = await Setting.countDocuments();

    res.status(200).json({
      Settings,
    });
  } catch (error) {
    next(error);
  }
};

export const getProgramPosts = async (req, res, next) => {
  try {
     const getprogramposts = await ProgramPost.findOne().sort({ createdAt: -1 });
    

    // const totalPosts = await Setting.countDocuments();

    res.status(200).json({
      getprogramposts,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserPostPerMonth = async (req, res, next) => {
  const userId = req.params.userId; // assuming you have auth middleware "692e206e0caf26c89f808079"; 
  console.log(req.params.userId)
 try {
    const now = new Date();

    // Start of current month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Start of next month (next allowed date)
    const nextAllowedDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const existingPost = await Post.findOne({
      userId,
      createdAt: { $gte: startOfMonth },
    });

    res.json({
      canPost: !existingPost,
      nextAllowedDate: existingPost ? nextAllowedDate : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      canPost: false,
      message: "Server error",
    });
  }

};


// export const deletepost = async (req, res, next) => {
  // if (!req.user.isAdmin || req.user.id !== req.params.userId) {
  //   return next(errorHandler(403, 'You are not allowed to delete this post'));
  // }
//   try {
//     await Post.findByIdAndDelete(req.params.postId);
//     res.status(200).json('The post has been deleted');
//   } catch (error) {
//     next(error);
//   }
// };





export const deletepost = async (req, res) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  const postId  = req.params.postId;
  const userId  = req.user.id;

  // console.log(postId, userId)

  try {
    // Find the post first
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.userId !== userId)
      return res.status(403).json({ message: 'Unauthorized' });

    // Delete image from Cloudinary
    if (post.imagePublicId) {
      console.log('Deleting Cloudinary image:', post.imagePublicId);
      await cloudinary.v2.uploader.destroy(post.imagePublicId);
    }

    // Delete post from database
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const updatepost = async (req, res, next) => {
  // if (!req.user.isAdmin || req.user.id !== req.params.userId) {
  //   return next(errorHandler(403, 'You are not allowed to update this post'));
  // }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
export const Approvepost = async (req, res, next) => {
  console.log(req.params.postId)
  // if (!req.user.isAdmin || req.user.id !== req.params.userId) {
  //   return next(errorHandler(403, 'You are not allowed to update this post'));
  // }
  try { 
    const updatedPost = await Post.findByIdAndUpdate( 
      req.params.postId,
      {
        $set: {
        postStatus: req.body.postStatus,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};



export const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.v2.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
      {
        folder: 'profiles',
        transformation: [{ width: 400, height: 400, crop: 'fill' }],
      }
    );

    res.status(200).json({
      url: result.secure_url,
    });
  } catch (error) {
    next(error);
  }
};


