import React from "react";

import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

import ArrowsComponet from "./ArrowsComponent";

const StyledTextField = withStyles({
    root: {
        fontSize: "25px",
        // width: "60%",
        "& label.Mui-focused": {
            color: "#ff3864",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#ff3864",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "black",
            },
            "&:hover fieldset": {
                borderColor: "black",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#ff3864",
            },
        },
    },
})(TextField);

function TextFieldSection({
    state_name,
    id,
    label,
    variant,
    required,
    multiline,
    rows,
    handleChange,
    value,
    type,
    sectionId,
}) {
    return (
        <section id={sectionId}>
            <StyledTextField
                id={id}
                label={label}
                variant={variant}
                required={required}
                multiline={multiline}
                rows={rows}
                onChange={(event) => handleChange(event, state_name)}
                value={value}
                type={type}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        window.location.hash = `#${sectionId + 1}`;
                        window.location.href = `#${sectionId + 1}`;
                    }
                }}
            />
            <ArrowsComponet sectionId={sectionId} />
        </section>
    );
}

export default TextFieldSection;
