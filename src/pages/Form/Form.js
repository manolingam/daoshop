import React from "react";
import ReactGA from "react-ga";

import Web3 from "web3";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";

// import DisclaimerSection from "../../components/DisclaimerSection";
import TextFieldSection from "../../components/TextFieldSection";
import CheckBoxSection from "../../components/CheckBoxSection";
import TimeSlotSection from "../../components/TimeSlotsSection";
import SuccessComponent from "../../components/SuccessComponent";

import { TEXT_FIELD_PROPS } from "../../utils/Constants";

import "./Form.css";

const THEME = createMuiTheme({
    typography: {
        fontFamily: "'Mirza', cursive",
        fontSize: "25px",
    },
    overrides: {
        MuiFormControl: {
            root: {
                // width: "60%",
                fontSize: "25px",
            },
        },
        MuiSvgIcon: {
            root: {
                fontSize: "25px",
            },
        },
        MuiFormLabel: {
            root: {
                color: "#ff3864",
            },
        },
        MuiFormControlLabel: {
            root: {
                height: "40px",
                padding: "5px",
                alignItems: "center",
                marginLeft: null,
                marginRight: null,
                verticalAlign: null,
            },
        },
        MuiStepConnector: {
            root: {
                padding: null,
            },
        },
        MuiStepLabel: {
            root: {
                fontSize: "17px",
            },
        },
        MuiIconButton: {
            label: {
                height: "40px",
            },
        },
    },
});

//MAINNET
const DAI_CONTRACT_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const DAI_ABI = require("../../utils/DaiABI.json");

// KOVAN TESTNET
// const DAI_CONTRACT_ADDRESS = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";
// const DAI_ABI = require("../../utils/DaiABI.json");

class Form extends React.Component {
    state = {
        // Airtable Base
        base: "",
        // Data from input
        project_name: "",
        summary: "",
        specs: "",
        name: "",
        email: "",
        handle: "",
        about_guild: "",
        to_know: "",
        slot_1: "",
        slot_2: "",
        slot_3: "",
        skills_required: {
            Consulting: false,
            "DAO Design/ Deployment": false,
            "Development (Frontend, Backend)": false,
            "Marketing (Copy writing, Strategy)": false,
            "Smart Contracts (Solidity, Audits)": false,
            "Visual Design (Branding, Illustration, etc)": false,
            "UI/UX Design": false,
            "Other/ Not Sure": false,
        },
        //Checks
        initiated_transaction: false,
        booking_confirmed: false,
        networkID: "",
        transaction_hash: "",
        snackbar_open: false,
        slot_1_focus: false,
        slot_2_focus: false,
        slot_3_focus: false,
        invalid_email: false,
    };

    handleTextFieldChange = (event, name) => {
        switch (name) {
            case "project_name":
                this.setState({ project_name: event.target.value });
                break;
            case "summary":
                this.setState({ summary: event.target.value });
                break;
            case "specs":
                this.setState({ specs: event.target.value });
                break;
            case "name":
                this.setState({ name: event.target.value });
                break;
            case "email":
                this.setState({ email: event.target.value });
                break;
            case "handle":
                this.setState({ handle: event.target.value });
                break;
            case "about_guild":
                this.setState({ about_guild: event.target.value });
                break;
            case "to_know":
                this.setState({ to_know: event.target.value });
                break;
            case "slot_1":
                this.setState({
                    slot_1: event.target.value,
                    slot_1_focus: false,
                });
                break;
            case "slot_2":
                this.setState({
                    slot_2: event.target.value,
                    slot_2_focus: false,
                });
                break;
            case "slot_3":
                this.setState({
                    slot_3: event.target.value,
                    slot_3_focus: false,
                });
                break;
            default:
                return;
        }
    };

    handleCheckBoxChange = (event) => {
        let skills_required = { ...this.state.skills_required };
        skills_required[event.target.name] = !skills_required[
            event.target.name
        ];
        this.setState({
            skills_required,
        });
    };

    submitData = async (skills_required) => {
        await fetch("https://guild-keeper.herokuapp.com/daoshop/mongo", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key: process.env.REACT_APP_ACCESS_KEY,
                project_name: this.state.project_name,
                summary: this.state.summary,
                skills_needed: skills_required,
                specs: this.state.specs,
                name: this.state.name,
                email: this.state.email,
                handle: this.state.handle,
                about_guild: this.state.about_guild,
                to_know: this.state.to_know,
                slot_1: this.state.slot_1,
                slot_2: this.state.slot_2,
                slot_3: this.state.slot_3,
                transaction_hash: this.state.transaction_hash,
            }),
        });

        this.setState({
            booking_confirmed: true,
            initiated_transaction: false,
        });

        try {
            await fetch("https://guild-keeper.herokuapp.com/daoshop/airtable", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    key: process.env.REACT_APP_ACCESS_KEY,
                    project_name: this.state.project_name,
                    summary: this.state.summary,
                    skills_needed: skills_required,
                    specs: this.state.specs,
                    name: this.state.name,
                    email: this.state.email,
                    handle: this.state.handle,
                    about_guild: this.state.about_guild,
                    to_know: this.state.to_know,
                    slot_1: this.state.slot_1,
                    slot_2: this.state.slot_2,
                    slot_3: this.state.slot_3,
                    transaction_hash: this.state.transaction_hash,
                }),
            });
        } catch (err) {}
    };

    startTransaction = async (skills_required) => {
        const DAI = new this.state.web3.eth.Contract(
            DAI_ABI,
            DAI_CONTRACT_ADDRESS
        );
        try {
            await DAI.methods
                .transfer(
                    "0xbeb3e32355a933501c247e2dbde6e6ca2489bf3d",
                    this.state.web3.utils.toWei("300")
                )
                .send({
                    from: this.state.accounts[0],
                })
                .once("transactionHash", async (hash) => {
                    this.setState(
                        {
                            transaction_hash: hash,
                        },
                        () => {
                            this.submitData(skills_required);
                        }
                    );
                });
        } catch (err) {
            this.setState({
                initiated_transaction: false,
                snackbar_open: true,
            });
        }
    };

    initTransaction = async (skills_required) => {
        if (typeof window.ethereum !== "undefined") {
            const web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.enable();
            let networkID = await web3.eth.net.getId();
            networkID = networkID.toString();

            this.setState(
                { web3, accounts, networkID, initiated_transaction: true },
                () => {
                    return networkID === "1"
                        ? this.startTransaction(skills_required)
                        : null;
                }
            );

            window.ethereum.on(
                "networkChanged",
                async function (networkID) {
                    this.setState({ networkID, initiated_transaction: false });
                }.bind(this)
            );

            window.ethereum.on(
                "accountsChanged",
                async function (accounts) {
                    this.setState({ accounts });
                }.bind(this)
            );
        } else {
            this.setState({ snackbar_open: true });
        }
    };

    validateData = () => {
        let skills_required = [];

        for (var key in this.state.skills_required) {
            if (this.state.skills_required[key]) {
                skills_required.push(key);
            }
        }

        let { summary, email, slot_1, slot_2, slot_3 } = this.state;
        let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!summary) {
            return (window.location.href = "#2");
        }

        if (!email) {
            return (window.location.href = "#6");
        }

        if (!pattern.test(email)) {
            this.setState({ invalid_email: true, snackbar_open: true });
            return (window.location.href = "#6");
        } else {
            this.setState({ invalid_email: false });
        }

        if (!slot_1) {
            return this.setState({ slot_1_focus: true });
        } else {
            this.setState({ slot_1_focus: false });
        }

        if (!slot_2) {
            return this.setState({ slot_2_focus: true });
        } else {
            this.setState({ slot_2_focus: false });
        }

        if (!slot_3) {
            return this.setState({ slot_3_focus: true });
        }

        this.setState({ slot_3_focus: false }, () =>
            this.initTransaction(skills_required)
        );
    };

    componentDidMount() {
        ReactGA.pageview(window.location.pathname);
    }

    render() {
        let {
            booking_confirmed,
            skills_required,
            slot_1_focus,
            slot_2_focus,
            slot_3_focus,
            initiated_transaction,
            networkID,
            snackbar_open,
            invalid_email,
            web3,
        } = this.state;

        return (
            <ThemeProvider theme={THEME}>
                {booking_confirmed ? (
                    <SuccessComponent hash={this.state.transaction_hash} />
                ) : (
                    <div className="form">
                        {/* <DisclaimerSection /> */}

                        {TEXT_FIELD_PROPS.map((field, index) => {
                            return field.label === "Skills Needed" ? (
                                <CheckBoxSection
                                    sectionId={index + 1}
                                    checkedValue={skills_required}
                                    handleCheckBoxChange={(event) => {
                                        this.handleCheckBoxChange(event);
                                    }}
                                />
                            ) : (
                                <TextFieldSection
                                    key={index}
                                    state_name={field.state_name}
                                    id={
                                        field.label === "Brief Summary"
                                            ? "outlined-multiline-static"
                                            : "standard-basic"
                                    }
                                    variant={
                                        field.label === "Brief Summary"
                                            ? "outlined"
                                            : "standard"
                                    }
                                    multiline={
                                        field.label === "Brief Summary"
                                            ? true
                                            : false
                                    }
                                    rows={
                                        field.label === "Brief Summary" ? 4 : 1
                                    }
                                    required={field.required}
                                    label={field.label}
                                    sectionId={index + 1}
                                    handleChange={(event, name) =>
                                        this.handleTextFieldChange(event, name)
                                    }
                                    value={this.state[field.state_name]}
                                    type={
                                        field.state_name === "email"
                                            ? "email"
                                            : "text"
                                    }
                                />
                            );
                        })}

                        <TimeSlotSection
                            handleTextFieldChange={this.handleTextFieldChange}
                            validateData={this.validateData}
                            slot_1_focus={slot_1_focus}
                            slot_2_focus={slot_2_focus}
                            slot_3_focus={slot_3_focus}
                            initiated_transaction={initiated_transaction}
                            networkID={networkID}
                        />

                        <Snackbar
                            open={snackbar_open}
                            autoHideDuration={6000}
                            onClose={() =>
                                this.setState({ snackbar_open: false })
                            }
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            message={
                                invalid_email
                                    ? "The email address provided is not valid!"
                                    : !web3
                                    ? "Not a web3 browser! Install Metamask."
                                    : "User cancelled transaction!"
                            }
                        ></Snackbar>
                    </div>
                )}
            </ThemeProvider>
        );
    }
}

export default Form;
