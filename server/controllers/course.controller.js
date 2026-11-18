import { Course } from "../models/course.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";
import { Lecture } from "../models/lecture.model.js";
import { unlink } from "node:fs/promises";

export const createCourse = async (req, res) => {
  try {
    console.log("from createCourse");
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course Title and Category is Required.",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      course,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

export const getCreatorCourse = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        course: [],
        message: "Course Not Found",
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    // console.log("Hello From edit Course");
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;
    // console.log("thumbnail is --" + thumbnail);
    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course Not found",
      });
    }

    if (course.creator.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this course",
      });
    }
    // console.log(course.courseThumbnail);
    // delete a thumbnail from cloudinary
    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      // upload the thumbnail to cloudinary
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    // console.log(
    //   "courseThumbnail.secure_url is -- " + courseThumbnail?.secure_url,
    // );
    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    // console.log(updateData);
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
      runValidators: true,
    });

    // console.log("mongoDB upated -- " + course);
    return res.status(200).json({
      course,
      message: "Course Updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Create Course",
    });
  } finally {
    if (req.file?.path) {
      await unlink(req.file.path).catch((err) => {
        console.log("Temporary file cleanup failed:", err);
      });
    }
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    // console.log(req.params);
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }

    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed To Get Courses By Id",
    });
  }
};

// old createLecture Implementation
// export const createLecture = async (req, res) => {
//   try {
//     const { lectureTitle } = req.body;
//     const { courseId } = req.params;
//     if (!lectureTitle?.trim() || !courseId) {
//       return res.status(400).json({
//         message: "Lecture Title and Course Id are Required",
//       });
//     }

//     let lecture = await Lecture.create({ lectureTitle });

//     const course = await Course.findById(courseId);
//     if (course) {
//       course.lectures.push(lecture._id);
//       await course.save();
//     }

//     return res.status(201).json({
//       message: "Lecture Created Successfully",
//       lecture,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Failed to Create Lecture",
//     });
//   }
// };

// new createLecture Implementation
export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle?.trim() || !courseId) {
      return res.status(400).json({
        message: "Lecture Title and Course Id are Required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    if (course.creator.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to add lectures to this course",
      });
    }

    const lecture = await Lecture.create({ lectureTitle });

    course.lectures.push(lecture._id);
    await course.save();

    return res.status(201).json({
      message: "Lecture Created Successfully",
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Create Lecture",
    });
  }
};

// old getLecture controller implementation
// export const getLecture = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const course = await Course.findById(courseId).populate("lectures");
//     if (!course) {
//       return res.status(404).json({
//         message: "Course Not found",
//       });
//     }
//     // console.log(course);
//     return res.status(200).json({
//       lectures: course.lectures,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Failed to Get Lectures",
//     });
//   }
// };
//old editLecture controller implementation
// export const editLecture = async (req, res) => {
//   try {
//     const { lectureTitle, videoInfo, isPreviewFree } = req.body;

//     const { courseId, lectureId } = req.params;

//     // IMPORTANT
//     const lecture = await Lecture.findById(lectureId);

//     if (!lecture) {
//       return res.status(404).json({
//         success: false,
//         message: "Lecture Not Found",
//       });
//     }

//     // Update lecture fields
//     if (lectureTitle) {
//       lecture.lectureTitle = lectureTitle;
//     }

//     if (videoInfo?.videoUrl) {
//       lecture.videoUrl = videoInfo.videoUrl;
//     }

//     if (videoInfo?.publicId) {
//       lecture.publicId = videoInfo.publicId;
//     }

//     // BOOLEAN FIX
//     if (isPreviewFree !== undefined) {
//       lecture.isPreviewFree = isPreviewFree;
//     }

//     await lecture.save();

//     // Ensure course contains lecture
//     const course = await Course.findById(courseId);

//     if (course && !course.lectures.includes(lecture._id)) {
//       course.lectures.push(lecture._id);

//       await course.save();
//     }

//     return res.status(200).json({
//       success: true,
//       lecture,
//       message: "Lecture updated successfully",
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed To Edit Lecture",
//     });
//   }
// };

//new (secure) editLecture controller implemantation

// new getLecture controller implementation
export const getLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // Find course without populating lectures
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    // Check whether user is the course creator
    const isCreator = course.creator.toString() === userId;

    // Check completed purchase
    const purchase = await CoursePurchase.findOne({
      courseId,
      userId,
      status: "completed",
    });

    const hasPurchased = !!purchase;

    // Creator and purchased students can access all lectures
    if (isCreator || hasPurchased) {
      await course.populate("lectures");
    } else {
      // Non-purchased users can access only free preview lectures
      await course.populate({
        path: "lectures",
        match: { isPreviewFree: true },
      });
    }

    return res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to Get Lectures",
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    // Find course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    // Verify course ownership
    if (course.creator.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this course",
      });
    }

    // Find lecture
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture Not Found",
      });
    }

    // Verify lecture belongs to this course
    const lectureExists = course.lectures.some(
      (id) => id.toString() === lectureId,
    );

    if (!lectureExists) {
      return res.status(404).json({
        success: false,
        message: "Lecture does not belong to this course",
      });
    }

    // Update lecture fields
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }

    if (videoInfo?.videoUrl) {
      lecture.videoUrl = videoInfo.videoUrl;
    }

    if (videoInfo?.publicId) {
      lecture.publicId = videoInfo.publicId;
    }

    if (isPreviewFree !== undefined) {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();

    return res.status(200).json({
      success: true,
      lecture,
      message: "Lecture updated successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed To Edit Lecture",
    });
  }
};

//old removeLecture implementation
// export const removeLecture = async (req, res) => {
//   try {
//     const { lectureId } = req.params;
//     // console.log(lectureId);
//     // Find & delete lecture
//     const lecture = await Lecture.findByIdAndDelete(lectureId);

//     if (!lecture) {
//       return res.status(404).json({
//         message: "Lecture Not Found",
//       });
//     }

//     // Delete video from Cloudinary
//     if (lecture.publicId) {
//       await deleteVideoFromCloudinary(lecture.publicId);
//     }

//     // Remove lecture reference from course
//     await Course.updateOne(
//       { lectures: lecture._id },
//       { $pull: { lectures: lecture._id } },
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Lecture Removed Successfully",
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed To Remove Lecture",
//     });
//   }
// };

// new removeLectureImplementation
export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    // Find the course containing this lecture
    const course = await Course.findOne({
      lectures: lectureId,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    // Verify course ownership
    if (course.creator.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this lecture",
      });
    }

    // Find lecture
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture Not Found",
      });
    }

    // Delete lecture
    await Lecture.findByIdAndDelete(lectureId);

    // Delete video from Cloudinary
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    // Remove lecture reference from course
    await Course.updateOne(
      { _id: course._id },
      { $pull: { lectures: lecture._id } },
    );

    return res.status(200).json({
      success: true,
      message: "Lecture Removed Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed To Remove Lecture",
    });
  }
};

// old getLectureById controller implementation
// export const getLectureById = async (req, res) => {
//   try {
//     const { lectureId } = req.params;
//     const lecture = await Lecture.findById(lectureId);
//     if (!lecture) {
//       return res.status(404).json({
//         message: "Lecture not found",
//       });
//     }
//     return res.status(200).json({
//       lecture,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Failed to get Lectures by id" });
//   }
// };

//publish and Unpublish Course Logic

// new getLectureById controller implementation
export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const userId = req.id;

    // Find course containing this lecture
    const course = await Course.findOne({
      lectures: lectureId,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course or Lecture Not Found",
      });
    }

    // Check whether user is the course creator
    const isCreator = course.creator.toString() === userId;

    // Check completed purchase
    const purchase = await CoursePurchase.findOne({
      courseId: course._id,
      userId,
      status: "completed",
    });

    const hasPurchased = !!purchase;

    // Fetch lecture only after authorization checks
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture Not Found",
      });
    }

    // Allow creator, purchased student or free preview access
    if (!isCreator && !hasPurchased && !lecture.isPreviewFree) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase this course to access this lecture",
      });
    }

    return res.status(200).json({
      success: true,
      lecture,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to Get Lecture By Id",
    });
  }
};

export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query; //true or false
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }
    if (course.creator.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this course",
      });
    }
    //publish status based on the query parameter
    course.isPublished = publish === "true";
    await course.save();

    const statusmessage = course.isPublished ? "publish" : "unpublished";
    return res.status(200).json({
      message: `Course is ${statusmessage}`,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to Update Course Status",
    });
  }
};

//get All The Published Courses
export const getPublishedCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });

    return res.status(200).json({
      success: true,
      courses,
      message:
        courses.length > 0
          ? "Published courses fetched successfully."
          : "No published courses available.",
    });
  } catch (error) {
    console.error("Error fetching published courses:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch published courses.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
// old searchCourse controller implementation
// export const searchCourse = async (req, res) => {
//   try {
//     const { query = "", categories = [], sortByPrice = "" } = req.query;

//     // Ensure categories is always an array
//     const categoriesArray = Array.isArray(categories)
//       ? categories
//       : categories
//         ? [categories]
//         : [];

//     // Escape special regex characters
//     const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

//     const searchCriteria = {
//       isPublished: true,
//     };

//     // Search by title and subtitle only
//     if (escapedQuery.trim()) {
//       searchCriteria.$or = [
//         {
//           courseTitle: {
//             $regex: escapedQuery,
//             $options: "i",
//           },
//         },
//         {
//           subTitle: {
//             $regex: escapedQuery,
//             $options: "i",
//           },
//         },
//       ];
//     }

//     // Filter by category
//     if (categoriesArray.length > 0) {
//       searchCriteria.category = {
//         $in: categoriesArray,
//       };
//     }

//     // Sorting options
//     const sortOptions = {};

//     if (sortByPrice === "low") {
//       sortOptions.coursePrice = 1;
//     } else if (sortByPrice === "high") {
//       sortOptions.coursePrice = -1;
//     } else {
//       // Latest courses first
//       sortOptions.createdAt = -1;
//     }

//     const courses = await Course.find(searchCriteria)
//       .populate({
//         path: "creator",
//         select: "name photoUrl",
//       })
//       .sort(sortOptions);

//     return res.status(200).json({
//       success: true,
//       count: courses.length,
//       courses,
//     });
//   } catch (error) {
//     console.error("Search Course Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to search courses",
//     });
//   }
// };

// new searchCourse controller implementation
export const searchCourse = async (req, res) => {
  try {
    const { query = "", categories = "", sortByPrice = "" } = req.query;

    const categoryArray = categories
      ? categories.split(",").map((item) => item.trim())
      : [];
    console.log(categories);

    // create search query
    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    // if categories selected
    if (categoryArray.length > 0) {
      searchCriteria.category = { $in: categoryArray };
    }

    // define sorting order
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; //sort by price in ascending
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1; // descending
    }

    let courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Search Internal Server Error",
    });
  }
};
