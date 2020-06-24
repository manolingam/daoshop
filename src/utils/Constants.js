const TEXT_FIELD_PROPS = [
    {
        state_name: "project_name",
        label: "Project Name",
        required: false,
    },
    { state_name: "summary", label: "Brief Summary", required: true },
    { state_name: "skills_needed", label: "Skills Needed", required: false },
    {
        state_name: "specs",
        label: "Do you have any functional documents / specs / mockups?",
        required: false,
    },
    { state_name: "name", label: "Your Name", required: false },
    { state_name: "email", label: "Email Address", required: true },
    {
        state_name: "handle",
        label: "Telegram or Discord Username",
        required: false,
    },
    {
        state_name: "about_guild",
        label: "How did you hear about the Guild?",
        required: false,
    },
    {
        state_name: "to_know",
        label: "Anything else you’d like the Guild to know?",
        required: false,
    },
];

const CHECKBOX_SKILLS_OPTIONS = [
    "Consulting",
    "DAO Design/ Deployment",
    "Development (Frontend, Backend)",
    "Marketing (Copy writing, Strategy)",
    "Smart Contracts (Solidity, Audits)",
    "Visual Design (Branding, Illustration, etc)",
    "UI/UX Design",
    "Other/ Not Sure",
];

module.exports = { TEXT_FIELD_PROPS, CHECKBOX_SKILLS_OPTIONS };
