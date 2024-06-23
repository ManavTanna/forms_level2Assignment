import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import useFormState from '../hooks/useFormState';
import useValidation from '../hooks/useValidation';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LinkIcon from '@mui/icons-material/Link';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';


const defaultTheme = createTheme();

export default function JobApplicationForm() {

  const skillOptions = ['JavaScript', 'CSS', 'Python'];

  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    portfolio: '',
    managementExperience: '',
    skills: [],
    interviewTime: dayjs(), // Initializing with current date and time
  };

  const { values, handleChange, handleSkillChange,  setValues } = useFormState(initialValues);
  const { errors, validate } = useValidation();
  const navigate = useNavigate();

  const [customSkill, setCustomSkill] = useState('');

  const handleDateTimeChange = (value) => {
    setValues({
      ...values,
      interviewTime: value,
    });
  };


  const handleAddSkill = () => {
    if (customSkill && !values.skills.includes(customSkill)) {
      handleSkillChange([...values.skills, customSkill]);
      setCustomSkill('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => () => {
    handleSkillChange(values.skills.filter((skill) => skill !== skillToDelete));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate(values)) {
      navigate('/submitted', { state: { ...values, interviewTime: values.interviewTime.toISOString() } });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://picsum.photos/1200/800)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <WorkOutlineIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Job Application
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              {/* Full Name */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                autoFocus
                InputProps={{
                  startAdornment: (
                    <PersonIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                  ),
                }}
              />
              {errors.fullName && (
                <Typography color="error">{errors.fullName}</Typography>
              )}
              {/* Email Address */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <EmailIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                  ),
                }}
              />
              {errors.email && (
                <Typography color="error">{errors.email}</Typography>
              )}
              {/* Phone Number */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="tel"
                value={values.phone}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <PhoneIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                  ),
                }}
              />
              {errors.phone && (
                <Typography color="error">{errors.phone}</Typography>
              )}
              {/* Applying for Position (Dropdown) */}
              <TextField
                select
                margin="normal"
                required
                fullWidth
                id="position"
                label="Applying for Position"
                name="position"
                value={values.position}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                InputProps={{
                  startAdornment: (
                    <BusinessCenterIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                  ),
                }}
              >
                <option></option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </TextField>
              {errors.position && (
                <Typography color="error">{errors.position}</Typography>
              )}
              {/* Relevant Experience (visible if Developer or Designer) */}
              {(values.position === 'Developer' || values.position === 'Designer') && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="experience"
                  label="Relevant Experience (years)"
                  name="experience"
                  type="number"
                  value={values.experience}
                  onChange={handleChange}
                  error={!!errors.experience}
                  helperText={errors.experience}
                  InputProps={{
                    startAdornment: (
                      <PsychologyIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                    ),
                    min:1
                  }}
                />
              )}
              {/* Portfolio URL (visible if Designer) */}
              {values.position === 'Designer' && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="portfolio"
                  label="Portfolio URL"
                  name="portfolio"
                  value={values.portfolio}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <LinkIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                    ),
                  }}
                  error={!!errors.portfolio}
                  helperText={errors.portfolio}

                />
              )}
              {/* Management Experience (visible if Manager) */}
              {values.position === 'Manager' && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="managementExperience"
                  label="Management Experience"
                  name="managementExperience"
                  value={values.managementExperience}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <PsychologyIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                    ),
                  }}
                  error={!!errors.managementExperience}
                  helperText={errors.managementExperience}
                />
              )}
              {/* Additional Skills (checkboxes) */}
              <Typography variant="body1" gutterBottom style={{marginTop:16}} className='text-gray-500'>
                Add additional skills:
              </Typography>
              <FormControl component="fieldset" style={{ marginTop: 16 }}>
                <FormGroup>
                  {skillOptions.map((skill) => (
                    <FormControlLabel
                      key={skill}
                      control={
                        <Checkbox
                          checked={values.skills.includes(skill)}
                          onChange={(e) => {
                            const newSkills = e.target.checked
                              ? [...values.skills, skill]
                              : values.skills.filter((s) => s !== skill);
                            handleSkillChange(newSkills);
                          }}
                          name={skill}
                        />
                      }
                      label={skill}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              <TextField
                margin="normal"
                fullWidth
                id="customSkill"
                label="Add Custom Skill"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <DoneAllIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddSkill}
                sx={{ mt: 2, mb: 2 }}
              >
                Add Skill
              </Button>
              <Stack direction="row" spacing={1}>
                {values.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={handleDeleteSkill(skill)}
                  />
                ))}
              </Stack>
              {errors.skills && (
                <Typography color="error">{errors.skills}</Typography>
              )}
              {/* Preferred Interview Time */}
              <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Preferred Interview Time"
                  value={values.interviewTime}
                  onChange={handleDateTimeChange}
                  minDate={dayjs()}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                />
              </LocalizationProvider>
              {errors.interviewTime && (
                <Typography color="error">{errors.interviewTime}</Typography>
              )}
              {/* Submit Button */}
              <div
                className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  position: "relative",
                  zIndex: 1,
                }}
                onClick={handleSubmit}
              >
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span
                  className="relative transition-colors duration-300 delay-200 group-hover:text-white ease"
                  style={{ zIndex: 2 }}
                >
                  Register
                </span>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
