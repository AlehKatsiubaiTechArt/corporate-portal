import { Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import { Controller, useForm } from 'react-hook-form'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'

interface SkillArgs {
  name: string
  progress: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modalRoot: {
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center'
    }
  }),
);

export function Skills({ skills = [] }: { skills: SkillArgs[] }) {

  const classes = useStyles();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    errors,
    formState,
    reset,
  } = useForm<SkillArgs>()

  const [open, setOpen] = React.useState(false)

  const onSubmit = handleSubmit((variables) => {})

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAdd = () => {
    handleClose()
  }

  return (
    <>
      <Grid container alignItems="center">
        {skills.map((skill) => (
          <Skill {...skill} />
        ))}
        <Box p={1}>
          <IconButton onClick={handleOpen} color="inherit">
            <AddIcon />
          </IconButton>
        </Box>
      </Grid>
      <Modal
        open={open}
        className={classes.modalRoot}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form onSubmit={onSubmit} className={classes.paper}>
          <Typography variant="caption" component="h3" color="textSecondary">
            Add Skill
          </Typography>
          <Controller
            as={TextField}
            control={control}
            required
            name="name"
            label="First name"
            fullWidth
            defaultValue=""
          />
          <Controller
            as={TextField}
            control={control}
            required
            name="surname"
            label="Last name"
            fullWidth
            defaultValue=""
          />
          <Button type="submit" size="large" onClick={handleAdd}>Add</Button>
        </form>
      </Modal>
    </>
  )
}

function Skill({ name, progress = 0 }: { name: string; progress: number }) {
  return (
    <Box p={1}>
      <Typography align="center">{name}</Typography>
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" value={progress} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color="textSecondary"
          >{`${Math.max(Math.min(Math.round(progress), 100), 0)}%`}</Typography>
        </Box>
      </Box>
    </Box>
  )
}
