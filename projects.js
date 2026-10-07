const projects = [
  {
    id: "mep-coordination",
    title: "Integrated Revit MEP Coordination",
    category: "BIM Coordination",
    year: "2024–2026",
    client: "Confidential",
    role: "M&E BIM Lead / BIM Designer",
    coverImage: "assets/images/mep-cover.png",
    summary: "Multidisciplinary modelling, clash resolution and coordinated construction information across architectural, structural and MEP constraints.",
    overview: "This case study demonstrates how I used BIM coordination to identify conflicts early, communicate issues clearly and develop coordinated solutions with the project team.",
    tools: ["Revit", "Navisworks", "Dalux", "ACC", "AutoCAD"],
    contributions: [
      "Coordinated architectural, structural and MEP models.",
      "Reviewed ceiling, shaft, bathroom and penetration constraints.",
      "Prepared model views and coordination information for project discussions.",
      "Managed updates across design changes and multidisciplinary comments."
    ],
    challenge: "Multiple services had to fit within tight ceiling, shaft and structural zones while maintaining architectural requirements.",
    approach: "I reviewed the combined models, isolated high-risk zones, prepared clear coordination views and worked through routing and opening options with the relevant disciplines.",
    result: "The workflow improved issue visibility and supported more coordinated model information before downstream construction activities.",
    beforeAfter: {
      enabled: true,
      heading: "From coordination issue to resolved model.",
      description: "Explore the model before and after coordination.",
      before: "assets/images/mep-before.png",
      after: "assets/images/mep-after.png",
      beforeLabel: "Before",
      afterLabel: "Resolved"
    },
    gallery: [],
    videos: [
      {
        enabled: false,
        type: "youtube",
        youtubeId: "PASTE_YOUTUBE_VIDEO_ID_HERE",
        title: "Coordination Walkthrough",
        description: "An unlisted YouTube video keeps the website lightweight."
      },
      {
        enabled: false,
        type: "local",
        src: "assets/videos/mep-walkthrough.mp4",
        poster: "assets/images/mep-cover.jpg",
        title: "Coordination Walkthrough",
        description: "A short walkthrough showing the coordinated model and key zones."
      }
    ]
  },
  {
    id: "4d-sequencing",
    title: "Animation & 4D Construction Sequencing",
    category: "4D",
    year: "2025–2026",
    client: "Copen Grand, Singapore",
    role: "4D Visualisation",
    coverImage: "assets/images/4d-cover.png",
    summary: "Construction sequence visualisation used to communicate staging, access and methodology.",
    overview: "The objective was to convert programme and construction information into an understandable visual sequence for project communication.",
    tools: ["Revit", "Twinmotion", "Video editing"],
    contributions: [
      "Linked model elements to construction stages.",
      "Created clear stage-by-stage visual sequences.",
      "Adjusted camera movement and timing for easier understanding.",
      "Prepared final video output for presentation."
    ],
    challenge: "Programme information can be difficult to understand when presented only as dates and activity names.",
    approach: "I grouped model elements logically, matched them to programme stages and refined the animation to make key construction transitions easy to follow.",
    result: "The final video provided a faster and more visual way to review construction methodology and sequence.",
    gallery: [
      { src: "assets/images/4d-01.png", caption: "Early construction stage." },
      { src: "assets/images/4d-02.png", caption: "Intermediate construction stage." },
      { src: "assets/images/4d-03.png", caption: "Sequence timeline setup." }
    ],
   videos: [
  {
    enabled: true,
    type: "youtube",
    youtubeId: "bJs9ZbmmG38",
    title: "Copen Grand 4D Sequence",
    description: "Construction staging and sequence for Copen Grand."
  },
  {
    enabled: true,
    type: "youtube",
    youtubeId: "s14P4x6udgY",
    title: "J'Den Condo ERSS 4D Sequence",
    description: "Earth retaining and stabilising structure construction sequence."
  },
  {
    enabled: true,
    type: "youtube",
    youtubeId: "pjZdww0rX-0",
    title: "PPVC Module Casting At Precast Yard",
    description: "The casting sequence for prefabricated volumetric modules."
  },

    {
    enabled: true,
    type: "youtube",
    youtubeId: "L2Q7bbj-xOI",
    title: "PPVC Installation Method",
    description: "A visual walkthrough of the module installation method."
  },

      {
        enabled: false,
        src: "assets/videos/4d-detail.mp4",
        poster: "assets/images/4d-cover02.png",
        title: "Detailed Sequence",
        description: "A closer view of a selected construction stage."
      }
    ]
  },
  {
    id: "vehicle-swept-path",
    title: "Vehicle Swept-Path Analysis",
    category: "Analysis",
    year: "2024–2026",
    client: "Confidential",
    role: "BIM / Logistics Analysis",
    coverImage: "assets/images/swept-cover.png",
    summary: "Vehicle access, turning and manoeuvring studies for construction and permanent layouts.",
    overview: "This work tested whether selected vehicles could safely enter, turn and exit within constrained project layouts.",
    tools: ["AutoCAD", "Vehicle tracking software"],
    contributions: [
      "Selected appropriate vehicle templates.",
      "Tested access routes and turning movements.",
      "Identified conflict points with kerbs, walls and site constraints.",
      "Prepared visual results and recommended adjustments."
    ],
    challenge: "Large vehicles had to manoeuvre through limited site geometry without creating unsafe or impractical movements.",
    approach: "I tested alternative entry angles, turning paths and layout adjustments, then compared the resulting swept envelopes.",
    result: "The analysis supported layout decisions and highlighted areas requiring geometric or operational changes.",
    gallery: [
      { src: "assets/images/swept-01.png", caption: "Vehicle turning path study." },
      { src: "assets/images/swept-02.png", caption: "Conflict check at constrained access." }
    ],
    videos: []
  },
  {
    id: "revit-plugin",
    title: "Revit Workflow Plugin",
    category: "Automation",
    year: "2026",
    client: "Internal Workflow",
    role: "Developer and BIM User",
    coverImage: null,
    summary: "A custom Revit add-in developed to reduce repetitive work and standardise a project workflow.",
    overview: "The plugin was created from a real BIM workflow requirement. I translated the manual process into functions, interface controls and automated Revit actions.",
    tools: ["C#", "Revit API", "Visual Studio"],
    contributions: [
      "Mapped the existing manual workflow.",
      "Defined plugin functions and user interface requirements.",
      "Developed and tested Revit API commands.",
      "Refined the tool based on real project use."
    ],
    challenge: "The original workflow involved repetitive model actions and was vulnerable to inconsistent user execution.",
    approach: "I broke the process into repeatable steps, converted those steps into software logic and added validation where needed.",
    result: "The tool reduced repetitive work and demonstrated how BIM knowledge can be converted into practical automation.",
    gallery: [],
    videos: [
      {
        enabled: false,
        src: "assets/videos/plugin-demo.mp4",
        poster: "assets/images/plugin-cover.png",
        title: "Plugin Demonstration",
        description: "A short demonstration of the plugin workflow."
      }
    ]
  },
  {
    id: "vr-walkthrough",
    title: "VR Project Walkthrough",
    category: "Visualisation",
    year: "2025–2026",
    client: "Confidential",
    role: "VR / BIM Visualisation",
    coverImage: null,
    summary: "Immersive model walkthrough used for design understanding, coordination and presentation.",
    overview: "The BIM model was prepared for real-time visualisation so project information could be experienced at human scale.",
    tools: ["Enscape", "Twinmotion", "Unreal Engine", "VR headset"],
    contributions: [
      "Prepared and optimised BIM geometry.",
      "Set up materials, lighting and navigation.",
      "Created presentation views and walkthroughs.",
      "Supported immersive project review."
    ],
    challenge: "Raw BIM models can be too heavy or visually unclear for comfortable real-time review.",
    approach: "I simplified unnecessary geometry, organised materials and selected views that clearly communicated the space.",
    result: "The walkthrough made spatial relationships easier to understand than drawings or static screenshots alone.",
    gallery: [],
    videos: [
      {
        enabled: false,
        src: "assets/videos/vr-demo.mp4",
        poster: "assets/images/vr-cover.png",
        title: "VR Walkthrough",
        description: "A short walkthrough of the real-time environment."
      }
    ]
  },
  {
    id: "3d-printing",
    title: "Digital Fabrication & 3D Printing",
    category: "3D Printing",
    year: "2025–2026",
    client: "Internal Presentation",
    role: "3D Model Preparation and Printing",
    coverImage: null,
    summary: "A BIM-to-print workflow producing physical scale models for communication and review.",
    overview: "Digital project geometry was prepared, repaired and converted into printable parts before slicing, fabrication and finishing.",
    tools: ["Revit", "Blender", "Bambu Studio", "3D printer"],
    contributions: [
      "Prepared source geometry for fabrication.",
      "Repaired non-manifold and overly detailed elements.",
      "Split and oriented parts for reliable printing.",
      "Managed slicing, printing, assembly and finishing."
    ],
    challenge: "Construction models contain excessive detail and geometry that is unsuitable for physical printing.",
    approach: "I simplified the model, corrected geometry, divided the output into printable components and tested appropriate print settings.",
    result: "The final physical model provided a strong presentation tool and demonstrated a complete digital-to-physical workflow.",
    gallery: [],
    videos: [
      {
        enabled: false,
        src: "assets/videos/print-timelapse.mp4",
        poster: "assets/images/print-cover.png",
        title: "Printing Time-lapse",
        description: "A shortened view of the fabrication process."
      }
    ]
  }
];
