import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardDatePicker } from '@material-ui/pickers'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { Button, Divider } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Box from '@material-ui/core/Box/Box'
import { useCurrentUserQuery, UserSearchArgs, useUpdateProfileMutation } from '../graphql'
import { Controller, useForm } from 'react-hook-form'
import { Skills } from '../components/Skills'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}))

export default function Profile() {
  const classes = useStyles()

  const { register, control, setValue, handleSubmit, errors, formState, reset } = useForm<UserSearchArgs>()

  const { data, loading, error } = useCurrentUserQuery({ onCompleted: data => {
    reset(data?.currentUser || {})
  } });

  const onSubmit = handleSubmit((variables) => {
    updateProfile({ variables })
  })

  const [updateProfile] = useUpdateProfileMutation()

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const skills = [
    { name: 'JS', progress: 100 },
    { name: 'React', progress: 70 },
  ]

  return (
    <Paper className={classes.paper}>
      <Typography variant="h3" gutterBottom>
        Profile
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Controller
              as={TextField}
              control={control}
              required
              name="name"
              label="First name"
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              as={TextField}
              control={control}
              required
              name="surname"
              label="Last name"
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={10}>Junior Software Developer</MenuItem>
                <MenuItem value={20}>Software Developer</MenuItem>
                <MenuItem value={30}>Senior Software Developer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={TextField}
              control={control}
              required
              id="education"
              name="education"
              label="Education"
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              id="date-picker-inline"
              label="Date picker inline"
              onChange={() => {}}
              value={selectedDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={TextField}
              control={control}
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={TextField}
              control={control}
              required
              type="tel"
              id="cell"
              name="cell"
              label="Cell"
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={TextField}
              control={control}
              required
              id="skype"
              name="skype"
              label="Skype"
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={TextField}
              control={control}
              required
              id="department"
              name="department"
              label="Department"
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item sm={12}></Grid>
        </Grid>
        <Divider />
        <Typography variant="h4">Skills</Typography>
        <Skills skills={skills} />
        <Button type="submit" size="large">Submit</Button>
      </form>
    </Paper>
  )
}


