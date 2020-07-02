import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

const StyledTextField = withStyles({
    root: {
        fontSize: "25px",
        width: "50%",
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

class TimeSlotSection extends Component {
    render() {
        let {
            handleTextFieldChange,
            slot_1_focus,
            slot_2_focus,
            slot_3_focus,
            initiated_transaction,
            networkID,
        } = this.props;
        return (
            <section id='10'>
                <p
                    style={{
                        width: "70%",
                        fontSize: "15pt",
                        lineHeight: "1.3",
                        marginBottom: "15px",
                    }}
                >
                    Mention a few preferred consultation times below. You can
                    provide us with three different date and time slots. And we
                    will reach out to confirm one that best suits all parties.
                </p>
                <StyledTextField
                    id='standard-basic'
                    label='Slot 1 (DD/MM/YYYY - Hour:Minute AM/PM)'
                    required
                    onChange={(event) => handleTextFieldChange(event, "slot_1")}
                    helperText={slot_1_focus ? "This is required" : null}
                />
                <StyledTextField
                    id='standard-basic'
                    label='Slot 2 (DD/MM/YYYY - Hour:Minute AM/PM)'
                    required
                    onChange={(event) => handleTextFieldChange(event, "slot_2")}
                    helperText={slot_2_focus ? "This is required" : null}
                />
                <StyledTextField
                    id='standard-basic'
                    label='Slot 3 (DD/MM/YYYY - Hour:Minute AM/PM)'
                    required
                    onChange={(event) => handleTextFieldChange(event, "slot_3")}
                    helperText={slot_3_focus ? "This is required" : null}
                />

                {!initiated_transaction ? (
                    <button
                        id='submit-button'
                        type='submit'
                        onClick={() => this.props.validateData()}
                    >
                        Pay 0.5 DAI & Submit
                    </button>
                ) : networkID !== "42" ? (
                    <p
                        style={{
                            height: "50px",
                            marginTop: "30px",
                            fontSize: "35px",
                        }}
                    >
                        Switch to Kovan!
                    </p>
                ) : (
                    <div>
                        <div className='lds-ellipsis'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <p>
                            Transaction in progress. Please do not resubmit or
                            close the page.
                        </p>
                    </div>
                )}
            </section>
        );
    }
}

export default TimeSlotSection;
