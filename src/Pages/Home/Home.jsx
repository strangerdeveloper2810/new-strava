import { useState } from "react";
import { useDispatch } from "react-redux"
import {
    Box,
    Button,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import "moment/locale/vi";
import { FETCH_API_GET_TOKEN_STRAVA } from "../../Redux/types";


const Home = () => {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [isVisiableBtnStrava, setIsVisiableBtnStrava] = useState(false);

    const dispatch = useDispatch();

    const handleConnectStravaToGetToken = () => {
        dispatch({
            type: FETCH_API_GET_TOKEN_STRAVA
        })
    }

    const handleSubmit = (values) => {
        const { fullName, gender, birthDate } = values;
        const formatBirthDate = moment(birthDate).locale("vi").format("DD/MMMM/YYYY");
        const currentTime = moment().format("DD/MM/YYYY HH:mm:ss");
        console.log(currentTime);
    };

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required('Họ và Tên không được để trống'),
        gender: Yup.string()
            .required('Giới tính không được bỏ trống'),
        birthDate: Yup.date()
            .nullable()
            .required('Ngày tháng năm sinh không được bỏ trống')
    });

    const formikBag = useFormik({
        initialValues: { fullName: "", gender: "", birthDate: null },
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Box
            component="form"
            sx={{ mt: 10 }}
            onSubmit={formikBag.handleSubmit}
        >
            <Stack justifyContent="center" alignContent="center" direction="column">
                <Typography variant="h5" component="h5">
                    Đăng ký Challenges
                </Typography>

                <TextField
                    id="outlined-basic"
                    name="fullName"
                    label="Họ và Tên"
                    variant="outlined"
                    sx={{ mt: 2 }}
                    value={formikBag.values.fullName}
                    onChange={formikBag.handleChange}
                    onBlur={formikBag.handleBlur}
                    error={formikBag.touched.fullName && Boolean(formikBag.errors.fullName)}
                    helperText={formikBag.touched.fullName && formikBag.errors.fullName}
                />

                <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>
                    Giới tính
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="gender"
                    value={formikBag.values.gender}
                    label="Giới tính"
                    onChange={formikBag.handleChange}
                    onBlur={formikBag.handleBlur}
                    sx={{ mt: 2 }}
                    error={formikBag.touched.gender && Boolean(formikBag.errors.gender)}
                >
                    <MenuItem value={"Nam"}>Nam</MenuItem>
                    <MenuItem value={"Nữ"}>Nữ</MenuItem>
                </Select>
                {formikBag.touched.gender && formikBag.errors.gender && (
                    <div style={{ color: 'red', marginTop: '4px' }}>{formikBag.errors.gender}</div>
                )}

                <InputLabel id="birthday" sx={{ mt: 2 }}>
                    Ngày tháng năm sinh:
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                            name="birthDate"
                            value={formikBag.values.birthDate}
                            onChange={(newValue) => formikBag.setFieldValue("birthDate", newValue)}
                            onBlur={() => formikBag.setFieldTouched("birthDate", true)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    sx={{ mt: 2 }}
                                    error={formikBag.touched.birthDate && Boolean(formikBag.errors.birthDate)}
                                    helperText={formikBag.touched.birthDate && formikBag.errors.birthDate}
                                />
                            )}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <InputLabel id="connect-strava-button" sx={{ mt: 2 }}>
                    Kết nối với strava
                </InputLabel>
                <Button variant="contained" sx={{ mt: 2, p: "6px 0", width: "230px" }} onClick={handleConnectStravaToGetToken}>
                    Đăng nhập Strava
                </Button>
            </Stack>
            <Box>
                <Stack
                    justifyContent="flex-end"
                    alignContent="flex-end"
                    direction="row"
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 2,
                            p: "6px 0",
                            width: "230px",
                            bgcolor: "#198754",
                            "&:hover": {
                                backgroundColor: "#0f5132",
                            },
                        }}
                    >
                        Đăng Ký
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default Home;