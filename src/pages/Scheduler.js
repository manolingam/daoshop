import React, { Component } from "react";

import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepContent from "@material-ui/core/StepContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

const time_slots = [...Array(3).keys()];

class Scheduler extends Component {
    constructor() {
        super();
        this.state = {
            confirmationTextVisible: false,
            stepIndex: 0,
            appointmentDateSelected: false,
            appointmentSlot: time_slots[0],
        };
    }

    handleNextStep = () => {
        const { stepIndex } = this.state;
        return stepIndex < 2
            ? this.setState({ stepIndex: stepIndex + 1 })
            : null;
    };

    handleDate = () => {
        const initSchedule = {};
        const today = moment().startOf("day");
        initSchedule[today.format("YYYY-DD-MM")] = true;
        const schedule = initSchedule;

        for (let day in schedule) {
            let slots = schedule[day];
            let dummy = slots.length
                ? slots.every((slot) => slot === true)
                    ? (schedule[day] = true)
                    : null
                : null;
        }

        this.setState({ schedule });
    };

    handleSetAppointmentDate = (date) => {
        this.handleNextStep();
        this.setState({ appointmentDate: date, confirmationTextVisible: true });
    };

    handleSetAppointmentSlot = (event) => {
        event.preventDefault();
        this.handleNextStep();
    };

    checkDisableDate = (day) => {
        const dateString = moment(day).format("YYYY-DD-MM");
        return (
            this.state.schedule[dateString] === true ||
            moment(day).startOf("day").diff(moment().startOf("day")) < 0
        );
    };

    renderConfirmationString = () => {
        return this.state.confirmationTextVisible ? (
            <h2
                style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "#ff3864",
                    maxWidth: "90%",
                    margin: "auto",
                }}
            >
                {
                    <span>
                        Scheduling a 1 hour appointment{" "}
                        {this.state.appointmentDate && (
                            <span style={{ color: "#000" }}>
                                on{" "}
                                {moment(this.state.appointmentDate).format(
                                    "dddd[,] MMMM Do"
                                )}
                            </span>
                        )}{" "}
                        {Number.isInteger(this.state.appointmentSlot) && (
                            <span style={{ color: "#000" }}>
                                at{" "}
                                {moment()
                                    .hour(9)
                                    .minute(0)
                                    .add(this.state.appointmentSlot, "hours")
                                    .format("h:mm a")}
                            </span>
                        )}
                    </span>
                }
            </h2>
        ) : null;
    };

    componentWillMount() {
        this.handleDate();
    }

    render() {
        const { stepIndex, ...data } = this.state;
        return (
            <div>
                {this.renderConfirmationString()}

                <Stepper activeStep={stepIndex} orientation='vertical'>
                    <Step>
                        <StepButton
                            onClick={() => this.setState({ stepIndex: 0 })}
                        >
                            Choose an available day for your appointment
                        </StepButton>
                        <StepContent>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    value={data.appointmentDate}
                                    onChange={(date) =>
                                        this.handleSetAppointmentDate(date)
                                    }
                                    shouldDisableDate={(day) =>
                                        this.checkDisableDate(day)
                                    }
                                />
                            </MuiPickersUtilsProvider>
                        </StepContent>
                    </Step>
                    <Step disabled={!data.appointmentDate}>
                        <StepButton
                            onClick={() => this.setState({ stepIndex: 1 })}
                        >
                            Choose an available time for your appointment
                        </StepButton>
                        <StepContent>
                            <form onSubmit={this.handleSetAppointmentSlot}>
                                <RadioGroup
                                    aria-label='time slots'
                                    name='time-slots'
                                    value={this.state.appointmentSlot}
                                    onChange={(event) => {
                                        this.setState({
                                            appointmentSlot: Number(
                                                event.target.value
                                            ),
                                        });
                                    }}
                                >
                                    {time_slots.map((slot, index) => {
                                        const t1 = moment()
                                            .hour(9)
                                            .minute(0)
                                            .add(slot, "hours");
                                        const t2 = moment()
                                            .hour(9)
                                            .minute(0)
                                            .add(slot + 1, "hours");

                                        return (
                                            <FormControlLabel
                                                key={index}
                                                value={slot}
                                                control={<Radio />}
                                                label={
                                                    t1.format("h:mm a") +
                                                    " - " +
                                                    t2.format("h:mm a")
                                                }
                                            />
                                        );
                                    })}
                                </RadioGroup>
                                <button id='submit-button' type='submit'>
                                    Pay 100 DAI & Submit
                                </button>
                            </form>
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

export default Scheduler;
