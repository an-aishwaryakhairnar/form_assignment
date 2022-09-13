import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import { getFormData } from "../services/DataService";
import CircularProgress from "@mui/material/CircularProgress";
import { Component } from "react";
import "./AddressModal.css";
import InputField from "./InputField";
import formData from '../assets/data/index.json';


const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#db3131",
          "&$error": {
            color: "#db3131",
          },
        },
      },
    },
  },
});
const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 6;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",

  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    margin: 1,
    width: 10,
    height: 10,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
    color: "#000000",
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#ffffff",
    boxSizing: "border-box",
    border: "2px solid #000000",
  },
}));
class AddressModal extends Component {
  constructor() {
    super();
    this.state = {
      serviceData: [],
      form: {
        ResidentialAddr: " ",
        companyName: "",
        contactName: "",
        phoneNumber: "",
        email: "",
        address1: "",
        address2: "",
        city: "",
        state: " ",
        zipCode: "",
        country: " ",
        sharing: "",
      },
      formErrors: {
        ResidentialAddr: null,
        companyName: "",
        contactName: "",
        phoneNumber: "",
        email: "",
        address1: "",
        address2: "",
        city: "",
        state: null,
        zipCode: null,
        country: null,
        sharing: "",
      },
    };
    this.countryList = [];
    this.stateArray = [];
    this.apiData();
    this.isLoading = true;
  }

  apiData = async () => {
    await getFormData().then(data=>{
      this.setState({serviceData:data});
      console.log(data);
      this.validationArray = data["data"];
      this.serviceData = data["data"];
      console.log(this.serviceData.length);
     if(this.serviceData.length>0){
      this.isLoading=false;
     }else{
      this.isLoading=true;
     }
      this.stateArray = this.serviceData[0].countryProvincesSelectList.US;
      this.countryList = this.serviceData[0].countriesSelectList;
    },(err=>{
      this.fetchJSON();      
    }));
  };
  fetchJSON=()=>{
    this.serviceData=formData;
    if(this.serviceData.length>0){
      this.forceUpdate();
      this.isLoading=false;
     }else{
      this.isLoading=true;
     }
    this.stateArray = this.serviceData[0].countryProvincesSelectList.US;
    this.countryList = this.serviceData[0].countriesSelectList;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const { form, formErrors } = this.state;

    let formObj = {};

    formObj = {
      ...form,
      [name]: value,
    };
    // }
    this.setState({ form: formObj }, () => {
      if (!Object.keys(formErrors).includes(name)) return;
      let formErrorsObj = {};
      const errorMsg = this.validateField(name, value);
      formErrorsObj = { ...formErrors, [name]: errorMsg };

      this.setState({ formErrors: formErrorsObj });
    });
  };

  validateField = (name, value, refValue) => {
    let errorMsg = null;
    switch (name) {
      case "companyName":
        if (!value || value === undefined)
          errorMsg = this.serviceData[0].companyNameRules.requiredMessage;
        else if (value.length > this.serviceData[0].companyNameRules.lengthMax)
          errorMsg = this.serviceData[0].companyNameRules.lengthMessage;

        break;
      case "contactName":
        if (!value || value === undefined)
          errorMsg = this.serviceData[0].contactNameRules.requiredMessage;
        else if (value.length > this.serviceData[0].contactNameRules.lengthMax)
          errorMsg = this.serviceData[0].contactNameRules.lengthMessage;

        break;
      case "address1":
        if (!value || value === undefined)
          errorMsg = this.serviceData[0].addressLine1Rules.requiredMessage;
        else if (value.length > this.serviceData[0].addressLine1Rules.lengthMax)
          errorMsg = this.serviceData[0].addressLine1Rules.lengthMessage;
        break;
      case "address2":
        if (!value || value === undefined)
          errorMsg = this.serviceData[0].addressLine2Rules.requiredMessage;
        else if (value.length > this.serviceData[0].addressLine2Rules.lengthMax)
          errorMsg = this.serviceData[0].addressLine2Rules.lengthMessage;

        break;
      case "email":
        if (!value) errorMsg = this.serviceData[0].emailRules.requiredMessage;
        else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        )
          //  else if(!/^(([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$)*$/.test(value))
          errorMsg = this.serviceData[0].emailRules.formatMessage;
        else if (value.length > this.serviceData[0].emailRules.lengthMax)
          errorMsg = this.serviceData[0].emailRules.lengthMessage;
        break;
      case "phoneNumber":
        if (!value) errorMsg = this.serviceData[0].phoneRules.requiredMessage;
        else if (value.length > this.serviceData[0].phoneRules.lengthMax)
          errorMsg = this.serviceData[0].phoneRules.lengthMessage;
        else if (!/^[0-9]*$/.test(value))
          errorMsg = this.serviceData[0].phoneRules.formatMessage;
        break;
      case "city":
        if (!value || value === undefined)
          errorMsg = this.serviceData[0].cityRules.requiredMessage;
        else if (value.length > this.serviceData[0].cityRules.lengthMax)
          errorMsg = this.serviceData[0].cityRules.lengthMessage;
        break;
      case "country":
        if (!value || value === null || value === " ")
          errorMsg = "Please select Country.";
        break;
      case "state":
        if (!value || value === " ")
          errorMsg = this.serviceData[0].stateRules.requiredMessage;
        break;
      case "zipCode":
        if (!value || value === " ")
          errorMsg = this.serviceData[0].postalCodeRules.requiredMessage;
        else if (value.length > this.serviceData[0].postalCodeRules.lengthMax)
          errorMsg = this.serviceData[0].postalCodeRules.lengthMessage;

        break;

      default:
        break;
    }
    return errorMsg;
  };

  validateForm = (form, formErrors, validateFunc) => {
    const errorObj = {};
    Object.keys(formErrors).map((x) => {
      let refValue = null;
      const msg = validateFunc(x, form[x], refValue);
      if (msg) errorObj[x] = msg;
    });
    return errorObj;
  };

  handleSubmit = () => {
    const { form, formErrors } = this.state;
    const errorObj = this.validateForm(form, formErrors, this.validateField);
    if (Object.keys(errorObj).length !== 0) {
      this.setState({ formErrors: { ...formErrors, ...errorObj } });
      return false;
    } 
    console.log("Data: ", form);
  };

  render() {
    const { form, formErrors, serviceData,isLoading } = this.state;
    return  this.isLoading ? (
      <div className="spinner">
        <CircularProgress />
      </div>
    ) : (
      <div className="popup">
        <div className="popup_inner">
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={6}>
              <h2>{this.props.title}</h2>
            </Grid>
            <Grid alignItems="end" xs={6}>
              <Box onClick={this.props.closePopup} pt={2} pl={40}>
                <CloseIcon sx={{ color: grey[500] }} fontSize="small" />
              </Box>
            </Grid>
            <Grid alignItems="end" xs={12}>
              <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AntSwitch
                    name="ResidentialAddr"
                    onChange={(e) =>
                      this.handleChange({
                        target: {
                          name: "ResidentialAddr",
                          value: e.target.checked,
                        },
                      })
                    }
                    inputProps={{ "aria-label": "ant design" }}
                  />
                  <Typography>Resdential address</Typography>
                </Stack>
              </FormGroup>
            </Grid>
            <Grid xs={6}>
              <ThemeProvider theme={theme}>
                <InputField
                  onChangefunct={this.handleChange}
                  onBlurfunct={this.handleChange}
                  value={form.Companyname}
                  fieldName={"companyName"}
                  label={"Company Name"}
                  serviceData={serviceData["data"]}
                ></InputField>
                {formErrors.companyName && (
                  <span className="err">{formErrors.companyName}</span>
                )}
              </ThemeProvider>
            </Grid>
            <Grid xs={6}>
              <ThemeProvider theme={theme}>
                <InputField
                  onChangefunct={this.handleChange}
                  onBlurfunct={this.handleChange}
                  value={form.contactName}
                  fieldName={"contactName"}
                  label={"Contact Name"}
                  serviceData={serviceData["data"]}
                ></InputField>
                {formErrors.contactName && (
                  <span className="err">{formErrors.contactName}</span>
                )}
              </ThemeProvider>
            </Grid>
            <Grid xs={6}>
              <ThemeProvider theme={theme}>
                <InputField
                  onChangefunct={this.handleChange}
                  onBlurfunct={this.handleChange}
                  value={form.phoneNumber}
                  fieldName={"phoneNumber"}
                  label={"Phone Number"}
                  serviceData={serviceData["data"]}
                ></InputField>
                {formErrors.phoneNumber && (
                  <span className="err">{formErrors.phoneNumber}</span>
                )}
              </ThemeProvider>
            </Grid>
            <Grid xs={6}>
              <ThemeProvider theme={theme}>
                <InputField
                  onChangefunct={this.handleChange}
                  onBlurfunct={this.handleChange}
                  value={form.email}
                  fieldName={"email"}
                  label={"Email"}
                  serviceData={serviceData["data"]}
                ></InputField>
                {formErrors.email && (
                  <span className="err">{formErrors.email}</span>
                )}
              </ThemeProvider>
            </Grid>
            <Grid xs={6}>
              <ThemeProvider theme={theme}>
                <InputField
                  onChangefunct={this.handleChange}
                  onBlurfunct={this.handleChange}
                  value={form.address1}
                  fieldName={"address1"}
                  label={"Address Line1"}
                  serviceData={serviceData["data"]}
                ></InputField>
                {formErrors.address1 && (
                  <span className="err">{formErrors.address1}</span>
                )}
              </ThemeProvider>
            </Grid>
            <Grid xs={6}>
              <ThemeProvider theme={theme}>
                <InputField
                  onChangefunct={this.handleChange}
                  onBlurfunct={this.handleChange}
                  value={form.address2}
                  fieldName={"address2"}
                  label={"Address Line2"}
                  serviceData={serviceData["data"]}
                ></InputField>
                {formErrors.address2 && (
                  <span className="err">{formErrors.address2}</span>
                )}
              </ThemeProvider>
            </Grid>
            <Grid xs={6}>
              <ThemeProvider theme={theme}>
                <InputField
                  onChangefunct={this.handleChange}
                  onBlurfunct={this.handleChange}
                  value={form.city}
                  fieldName={"city"}
                  label={"City"}
                  serviceData={serviceData["data"]}
                ></InputField>
                {formErrors.city && (
                  <span className="err">{formErrors.city}</span>
                )}
              </ThemeProvider>
            </Grid>
            <Grid xs={6}>
              <ThemeProvider theme={theme}>
                <FormControl
                  variant="outlined"
                  style={{ width: "100%" }}
                  margin={"1"}
                >
                  <InputLabel required id="test-select-label">
                    State
                  </InputLabel>
                  <Select
                    labelId="test-select-label"
                    id="test-select"
                    name="state"
                    MenuProps={MenuProps}
                    value={form.state}
                    onBlur={this.handleChange}
                    onChange={(e) =>
                      this.handleChange({
                        target: {
                          name: "state",
                          value: e.target.value,
                        },
                      })
                    }
                  >
                    {this.stateArray.map((data) => (
                      <MenuItem key={data.text} value={data.value}>
                        <Typography>{data.text}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.state && (
                    <span className="err">{formErrors.state}</span>
                  )}
                </FormControl>
              </ThemeProvider>
            </Grid>
            <Grid xs={6}>
              <InputField
                onChangefunct={this.handleChange}
                onBlurfunct={this.handleChange}
                value={form.zipCode}
                fieldName={"zipCode"}
                label={"Zip Code"}
                serviceData={serviceData["data"]}
              ></InputField>
              {formErrors.zipCode && (
                <span className="err">{formErrors.zipCode}</span>
              )}
            </Grid>
            <Grid xs={6}>
              <ThemeProvider theme={theme}>
                <FormControl
                  variant="outlined"
                  style={{ width: "100%" }}
                  margin={"1"}
                >
                  <InputLabel required id="test-select-label">
                    Country
                  </InputLabel>
                  <Select
                    labelId="test-select-label"
                    id="test-select"
                    size="small"
                    name="country"
                    MenuProps={MenuProps}
                    value={form.country}
                    onBlur={this.handleChange}
                    onChange={(e) =>
                      this.handleChange({
                        target: {
                          name: "country",
                          value: e.target.value,
                        },
                      })
                    }
                  >
                    {this.countryList.map((data) => (
                      <MenuItem key={data.text} value={data.value}>
                        <Typography>{data.text}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.country && (
                    <span className="err">{formErrors.country}</span>
                  )}
                </FormControl>
              </ThemeProvider>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <FormControl name="sharing">
              <FormLabel id="demo-row-radio-buttons-group-label">
                Address sharing
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="Shared"
                onChange={(e) =>
                  this.handleChange({
                    target: {
                      name: "sharing",
                      value: e.target.value,
                    },
                  })
                }
              >
                <FormControlLabel
                  value="Shared"
                  control={<Radio />}
                  label="Shared"
                />
                <FormControlLabel
                  value="Private"
                  control={<Radio />}
                  label="Private"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button variant="text" onClick={this.props.closePopup}>
              Cancel
            </Button>
            <Button variant="text" value="Submit" onClick={this.handleSubmit}>
              Save
            </Button>
          </Grid>
        </div>
      </div>
    );
  }
}
export default AddressModal;
