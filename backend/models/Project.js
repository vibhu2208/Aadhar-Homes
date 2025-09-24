const mongoose = require("mongoose");

const bhk_Schema = new mongoose.Schema({
  bhk_type: {
    type: String, //1/2/3bhk
  },
  price: {
    type: String,
  },
  bhk_Area: {
    type: String,
  },
});

const highlight_Schema = new mongoose.Schema({
  highlight_Point: {
    type: String,
  },
});

const about_project_Schema = new mongoose.Schema({
  about_image: {
    type: String,
  },
  mobile_banner_image: {
    type: String,
  },
});

const projectSchema = new mongoose.Schema(
  {
    project_floorplan_Image: [],
    thumbnailImage: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
      cdn_url: {
        type: String,
        default: "",
      }
    },
    frontImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      cdn_url: {
        type: String,
      }
    },
    logo: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      cdn_url: {
        type: String,
      }
    },
    project_locationImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      cdn_url: {
        type: String,
      }
    },
    state: {
      type: String,
    },
    projectName: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    projectAddress: {
      type: String,
      required: [true, 'Project address is required'],
    },
    project_discripation: {
      type: String,
    },
    projectRedefine_Connectivity: [
      {
        type: String,
      },
    ],
    projectRedefine_Entertainment: [
      {
        type: String,
      },
    ],
    projectRedefine_Business: [
      {
        type: String,
      },
    ],
    projectRedefine_Education: [
      {
        type: String,
      },
    ],

    meta_description: {
      type: String,
    },
    meta_title: {
      type: String,
    },

    Amenities: [{ type: String }],
    projectBgContent: {
      type: String,
    },
    projectReraNo: {
      type: String,
    },
    type: {
      type: String,
      required: [true, 'Project type is required'],
    },
    country: {
      type: String,
      default: "India",
    },
    luxury: {
      type: String,
      default: "False",
    },
    spotlight:{
      type:String,
      default:"False",
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    builderName: {
      type: String,
      required: [true, 'Builder name is required'],
    },
    paymentPlan: {
      type: String,
    },
    AboutDeveloper: {
      type: String,
    },
    projectOverview: {
      type: String,
    },
    project_Brochure: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      cdn_url: {
        type: String,
      }
    },
    project_Status: {
      type: String,
      enum: ['Under Construction', 'Ready to Move', 'Upcoming', 'Completed'],
      default: 'Under Construction'
    },
    schema_type: {
      type: String,
      default: "project",
    },
    project_url: {
      type: String,
      unique: true,
      sparse: true, // Allow null values but ensure uniqueness when present
    },
    about_project: [about_project_Schema],
    BhK_Details: [bhk_Schema],
    highlight: [highlight_Schema],

    highlightImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      cdn_url: {
        type: String,
      }
    },
    projectMaster_plan: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      cdn_url: {
        type: String,
      }
    },
    projectGallery: [],
    towerNumber: {
      type: Number,
    },
    totalUnit: {
      type: Number,
    },
    totalLandArea: {
      type: Number,
    },
    launchingDate: {
      type: Date,
    },
    mobileNumber: {
      type: Number,
    },
    possessionDate: {
      type: Date,
    },
    minPrice: {
      type: Number,
    },
    maxPrice: {
      type: Number,
    },
  },

  {
    timestamps: true,
  },
);

// Text search index with weights
projectSchema.index(
  {
    projectName: "text",
    projectAddress: "text",
    project_discripation: "text",
    type: "text",
    city: "text",
    state: "text",
    builderName: "text",
    project_Status: "text",
  },
  {
    weights: {
      projectName: 6,
      projectAddress: 3,
      project_discripation: 2,
      type: 3,
      city: 2,
      state: 2,
      project_Status: 3,
      builderName: 1,
    },
  },
);

// Additional indexes for better query performance
projectSchema.index({ city: 1, type: 1 });
projectSchema.index({ minPrice: 1, maxPrice: 1 });
projectSchema.index({ project_Status: 1 });
projectSchema.index({ createdAt: -1 });

// Virtual for price range
projectSchema.virtual('priceRange').get(function() {
  if (this.minPrice && this.maxPrice) {
    return `₹${this.minPrice} - ₹${this.maxPrice}`;
  }
  return 'Price on Request';
});

// Ensure virtual fields are serialized
projectSchema.set('toJSON', { virtuals: true });

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
