import { Course } from "../models/course.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";
import { Lecture } from "../models/lecture.model.js";
import { json } from "express";

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

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;
    if (!lectureTitle?.trim() || !courseId) {
      return res.status(400).json({
        message: "Lecture Title and Course Id are Required",
      });
    }

    let lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

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

export const getLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course Not found",
      });
    }
    // console.log(course);
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Get Lectures",
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;

    const { courseId, lectureId } = req.params;

    // IMPORTANT
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture Not Found",
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

    // BOOLEAN FIX
    if (isPreviewFree !== undefined) {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();

    // Ensure course contains lecture
    const course = await Course.findById(courseId);

    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);

      await course.save();
    }

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

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    // console.log(lectureId);
    // Find & delete lecture
    const lecture = await Lecture.findByIdAndDelete(lectureId);

    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
      });
    }

    // Delete video from Cloudinary
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    // Remove lecture reference from course
    await Course.updateOne(
      { lectures: lecture._id },
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

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get Lectures by id" });
  }
};

//publish and Unpublish Course Logic

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
    const courses = await Course.find({
      isPublished: true,
    }).populate({
      path: "creator",
      select: "name photoUrl",
    });

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Published Courses Found",
      });
    }

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to Get Published Courses",
    });
  }
};

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

export const searchCourse = async (req, res) => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;
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
    if (categories.length > 0) {
      searchCriteria.category = { $in: categories };
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
  }
};
