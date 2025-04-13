# Material UI

Material UI (officially "MUI") is a comprehensive React component library that implements Google's Material Design. It provides a set of accessible, customizable, and production-ready components that help developers build consistent and responsive user interfaces following Material Design principles.

## Overview

Material UI has been one of the most popular React UI libraries since its inception in 2014. The library has evolved significantly over the years, with the latest major version (v5) adopting a modern styling solution based on Emotion and expanding its component offerings.

### Key Features

- **Comprehensive Component Set**: 60+ production-ready React components
- **Material Design**: Implementation of Google's design system
- **Customization**: Powerful theming and style overriding capabilities
- **Accessibility**: WAI-ARIA compliant components
- **TypeScript Support**: Written in TypeScript with complete definitions
- **Server-Side Rendering**: Compatible with Next.js and other SSR frameworks
- **Theming**: Advanced theming system with support for dark mode
- **Rich Ecosystem**: Additional libraries for data grids, charts, date pickers, etc.
- **Active Community**: Extensive documentation, tutorials, and community support

## Installation and Setup

### Basic Installation

```bash
# Using npm
npm install @mui/material @emotion/react @emotion/styled

# Using yarn
yarn add @mui/material @emotion/react @emotion/styled

# Using pnpm
pnpm add @mui/material @emotion/react @emotion/styled
```

### Roboto Font

Material UI was designed with the Roboto font in mind. You can include it using Google Fonts:

```html
<!-- In your index.html -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

Or install it as an npm package:

```bash
npm install @fontsource/roboto
```

And import it in your entry point:

```jsx
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
```

### Icons

Material UI provides a set of Material Design icons as a separate package:

```bash
npm install @mui/icons-material
```

Usage:

```jsx
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

function IconsExample() {
  return (
    <div>
      <DeleteIcon />
      <SendIcon color="primary" fontSize="large" />
    </div>
  );
}
```

### Basic Usage

```jsx
import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Hello, Material UI!
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </div>
  );
}

export default App;
```

### Setting Up Theming

```jsx
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#ff1744",
    },
    background: {
      default: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalizes styles across browsers */}
      <Button variant="contained" color="primary">
        Themed Button
      </Button>
    </ThemeProvider>
  );
}

export default App;
```

## Core Components

### Layout Components

Material UI provides a responsive layout system based on the CSS Flexbox model:

```jsx
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function LayoutExample() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              Full width on mobile, half width on desktop
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              Full width on mobile, half width on desktop
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              Full width on mobile, one-third on desktop
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              Full width on mobile, one-third on desktop
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              Full width on mobile, one-third on desktop
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
```

#### Box Component

The `Box` component serves as a wrapper component for most CSS utility needs:

```jsx
<Box
  sx={{
    width: 300,
    height: 100,
    backgroundColor: "primary.main",
    "&:hover": {
      backgroundColor: "primary.dark",
      opacity: [0.9, 0.8, 0.7],
    },
    borderRadius: 2,
    p: 2,
    m: 1,
  }}
>
  This Box has custom styles
</Box>
```

### Input Components

#### TextField

```jsx
import TextField from "@mui/material/TextField";

function TextFieldExample() {
  return (
    <div>
      <TextField label="Standard" variant="standard" />
      <TextField label="Outlined" variant="outlined" />
      <TextField label="Filled" variant="filled" />
      <TextField
        label="Multiline"
        multiline
        rows={4}
        placeholder="Type your message here"
        variant="outlined"
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
      />
      <TextField
        label="Read Only"
        defaultValue="Hello World"
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
      />
      <TextField
        error
        label="Error"
        defaultValue="Invalid input"
        helperText="Incorrect entry."
        variant="outlined"
      />
    </div>
  );
}
```

#### Select

```jsx
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectExample() {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="age-select-label">Age</InputLabel>
        <Select
          labelId="age-select-label"
          id="age-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
```

#### Checkbox and Radio

```jsx
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function SelectionControlsExample() {
  return (
    <div>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />

      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
```

### Navigation Components

#### App Bar

```jsx
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function AppBarExample() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
```

#### Drawer

```jsx
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

function DrawerExample() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
```

#### Tabs

```jsx
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function TabsExample() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One Content
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two Content
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three Content
      </TabPanel>
    </Box>
  );
}
```

### Data Display Components

#### Table

```jsx
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function TableExample() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
```

#### Card

```jsx
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function CardExample() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
```

### Feedback Components

#### Dialog

```jsx
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function DialogExample() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
```

#### Snackbar

```jsx
import { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function SnackbarExample() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />
    </div>
  );
}
```

#### Progress

```jsx
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

function ProgressExample() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <CircularProgress />
      <CircularProgress color="secondary" />
      <LinearProgress />
      <LinearProgress color="secondary" />
      <LinearProgress variant="determinate" value={75} />
    </Box>
  );
}
```

## Advanced Features

### Theming

Material UI provides a powerful theming system to customize the look and feel of your application:

```jsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8, // Default is 8px
  components: {
    // Override default component styles
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>{/* Your app components */}</ThemeProvider>
  );
}
```

#### Dark Mode

```jsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  // Use system preference as default
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <IconButton onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        {/* Rest of your app */}
      </div>
    </ThemeProvider>
  );
}
```

### Styling

Material UI provides several approaches to styling components:

#### 1. `sx` Prop (Recommended)

The `sx` prop is the primary way to style components in MUI v5:

```jsx
<Box
  sx={{
    bgcolor: "background.paper",
    boxShadow: 1,
    borderRadius: 2,
    p: 2,
    minWidth: 300,
  }}
>
  <Box sx={{ color: "text.secondary" }}>Sessions</Box>
  <Box sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium" }}>
    98.3 K
  </Box>
  <Box
    sx={{
      color: "success.dark",
      display: "inline",
      fontWeight: "bold",
      mx: 0.5,
      fontSize: 14,
    }}
  >
    +18.77%
  </Box>
  <Box sx={{ color: "text.secondary", display: "inline", fontSize: 14 }}>
    vs. last week
  </Box>
</Box>
```

#### 2. Styled Components API

Material UI provides a styled API similar to styled-components:

```jsx
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  padding: theme.spacing(1, 2),
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function StyledExample() {
  return <CustomButton>Custom Styled Button</CustomButton>;
}
```

#### 3. Custom Theme Components

You can customize components globally through the theme:

```jsx
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          textTransform: "none",
          fontSize: 16,
          fontWeight: 600,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
      variants: [
        {
          props: { variant: "dashed" },
          style: {
            border: "2px dashed",
            color: "primary.main",
          },
        },
      ],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained">Rounded Button</Button>
      <Button variant="dashed">Custom Variant</Button>
    </ThemeProvider>
  );
}
```

### Server-Side Rendering

Material UI supports server-side rendering (SSR) with frameworks like Next.js:

```jsx
// pages/_document.js in Next.js
import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@mui/styles";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Render documents on the server with Emotion
MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
```

### Form Validation

Material UI works well with form libraries like Formik and React Hook Form:

```jsx
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function FormExample() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 500 }}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email format",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
```

## Material UI Ecosystem

### Core Libraries

Material UI consists of several packages:

- **@mui/material**: Core components implementing Material Design
- **@mui/icons-material**: Material Design icons
- **@mui/styles**: Legacy styling solution (JSS-based)
- **@mui/system**: System utilities for custom component development
- **@mui/utils**: Utilities used internally by MUI packages

### Additional Components

Material UI offers premium components and additional libraries:

#### MUI X (Premium Components)

- **@mui/x-data-grid**: Powerful data table component (free version)
- **@mui/x-data-grid-pro**: Advanced data grid with premium features
- **@mui/x-date-pickers**: Date and time pickers

```jsx
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
];

function DataGridExample() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
```

#### Material UI Base

The `@mui/base` package provides unstyled components and hooks that offer functionality without styles:

```jsx
import { unstable_useNumberInput as useNumberInput } from "@mui/base/unstable_useNumberInput";
import { styled } from "@mui/system";

const StyledInputRoot = styled("div")`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StyledInput = styled("input")`
  font-size: 16px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const StyledButton = styled("button")`
  border: 1px solid lightgray;
  background-color: transparent;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

function NumberInput() {
  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 5,
  });

  return (
    <StyledInputRoot {...getRootProps()}>
      <StyledButton {...getDecrementButtonProps()}>-</StyledButton>
      <StyledInput {...getInputProps()} />
      <StyledButton {...getIncrementButtonProps()}>+</StyledButton>
    </StyledInputRoot>
  );
}
```

#### MUI Joy (Alternative UI Library)

MUI Joy is a newer library that offers an alternative design approach:

```jsx
import { CssVarsProvider } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

function JoyExample() {
  return (
    <CssVarsProvider>
      <Card sx={{ maxWidth: 300, mx: "auto", my: 4 }}>
        <Typography level="h2">Joy UI Example</Typography>
        <Typography>This is a card component from Joy UI</Typography>
        <Button>Click Me</Button>
      </Card>
    </CssVarsProvider>
  );
}
```

## Common Patterns

### Dashboard Layout

```jsx
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography variant="h6">Chart</Typography>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography variant="h6">Recent Deposits</Typography>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Recent Orders</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
```

### Authentication Form

```jsx
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function AuthForm() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {tab === 0 ? "Sign In" : "Sign Up"}
        </Typography>
        <Tabs value={tab} onChange={handleTabChange} sx={{ mt: 2, mb: 3 }}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        {tab === 0 ? (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setTab(1)}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setTab(0)}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}
```

### Responsive Product Cards

```jsx
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Container from "@mui/material/Container";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Premium sound quality with noise cancellation technology.",
    price: 149.99,
    image: "/images/headphones.jpg",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smartwatch",
    description: "Track your fitness and stay connected with notifications.",
    price: 199.99,
    image: "/images/smartwatch.jpg",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    description: "Portable speaker with powerful bass and long battery life.",
    price: 79.99,
    image: "/images/speaker.jpg",
    rating: 4.7,
  },
  // More products...
];

function ProductCards() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: (theme) => theme.shadows[4],
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: "contain", p: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  ${product.price.toFixed(2)}
                </Typography>
                <Rating
                  name={`rating-${product.id}`}
                  value={product.rating}
                  precision={0.1}
                  readOnly
                  sx={{ mt: 1 }}
                />
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
```

## Performance Optimization

### Bundle Size Reduction

Material UI's default bundle size can be reduced in several ways:

#### 1. Tree Shaking

```jsx
// Use named imports instead of default imports
// Good
import { Button, TextField } from "@mui/material";

// Bad - will import the entire library
import Material from "@mui/material";
const { Button, TextField } = Material;
```

#### 2. Component Import Optimization

```jsx
// Instead of this (imports the entire library)
import { Button } from "@mui/material";

// Use this (only imports the Button component)
import Button from "@mui/material/Button";
```

#### 3. Using Default Props

Set default props to reduce the need for repetitive props:

```jsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: "small",
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* These buttons will have disableElevation=true and size="small" */}
      <Button>Primary</Button>
      <Button color="secondary">Secondary</Button>
    </ThemeProvider>
  );
}
```

### Component Memoization

Use React's `memo` and `useMemo` to prevent unnecessary re-renders:

```jsx
import { memo, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

// Memoize the entire component
const MemoizedCard = memo(function ProductCard({ product }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography>${product.price}</Typography>
      </CardContent>
    </Card>
  );
});

function ProductList({ products, filter }) {
  // Memoize the filtered list
  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return products.filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  return (
    <div>
      {filteredProducts.map((product) => (
        <MemoizedCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Virtualization for Long Lists

Use virtualization libraries like `react-window` for rendering large lists:

```jsx
import { FixedSizeList } from "react-window";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => {
    const item = items[index];

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemAvatar>
          <Avatar alt={item.name} src={item.avatar} />
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={item.email} />
      </ListItem>
    );
  };

  return (
    <FixedSizeList
      height={400}
      width="100%"
      itemSize={72}
      itemCount={items.length}
      overscanCount={5}
    >
      {Row}
    </FixedSizeList>
  );
}
```

## Material UI vs. Other Component Libraries

### Material UI vs. Ant Design

| Feature               | Material UI               | Ant Design               |
| --------------------- | ------------------------- | ------------------------ |
| **Design System**     | Material Design           | Ant Design               |
| **Component Count**   | 60+                       | 60+                      |
| **Framework Support** | React (primarily)         | React, Angular, Vue      |
| **Bundle Size**       | Larger but tree-shakable  | Larger but tree-shakable |
| **Styling System**    | Emotion/styled-components | Less CSS                 |
| **Theming**           | Very flexible             | More constrained         |
| **Enterprise Focus**  | General-purpose           | Enterprise-focused       |
| **Community**         | Very large                | Very large               |
| **Customization**     | Highly customizable       | Moderately customizable  |

### Material UI vs. Chakra UI

| Feature                 | Material UI          | Chakra UI                   |
| ----------------------- | -------------------- | --------------------------- |
| **Design System**       | Material Design      | Component-focused           |
| **API Approach**        | Component props      | Style props                 |
| **Bundle Size**         | Larger               | Smaller                     |
| **Learning Curve**      | Steeper              | Gentler                     |
| **Component Library**   | More comprehensive   | Growing, less comprehensive |
| **Theme Customization** | Complex but powerful | Simple and intuitive        |
| **Maturity**            | Very mature          | Newer but stable            |

### Material UI vs. Bootstrap

| Feature                | Material UI             | Bootstrap             |
| ---------------------- | ----------------------- | --------------------- |
| **Framework**          | React-specific          | Framework-agnostic    |
| **Design Language**    | Material Design         | Bootstrap Design      |
| **Component Richness** | Richer React components | More basic components |
| **Customization**      | Theme provider          | Sass variables        |
| **Bundle Size**        | Larger with full import | Smaller base library  |
| **Learning Curve**     | Steeper                 | Gentler               |

## When to Use Material UI

### Ideal Use Cases

1. **React Applications**: Built specifically for React
2. **Product-Focused Apps**: Admin dashboards, management systems, CRMs
3. **Material Design Followers**: Applications that want to adhere to Google's design language
4. **Highly Interactive UIs**: Complex forms, data displays, and interactions
5. **Design System Consistency**: When you need a comprehensive design system

### Less Ideal Cases

1. **Non-React Projects**: Not suitable for Angular, Vue (without adapters)
2. **Simple Static Sites**: May be overkill for basic websites
3. **Highly Custom Designs**: If you have a very unique design that differs significantly from Material Design
4. **Performance-Critical Applications**: Without careful optimization, can impact performance
5. **Limited Bundle Size**: Without tree-shaking, can add significant weight

## Resources

- [Material UI Documentation](https://mui.com/material-ui/getting-started/overview/)
- [Material UI GitHub Repository](https://github.com/mui/material-ui)
- [MUI Blog](https://mui.com/blog/)
- [Material Design Guidelines](https://m3.material.io/)
- [Material UI Templates](https://mui.com/templates/)
- [Material UI CodeSandbox Examples](https://codesandbox.io/examples/package/@mui/material)
- [MUI Treasury](https://mui-treasury.com/) - Collection of custom components
- [Material UI Community](https://mui.com/material-ui/discover-more/community/)
- [Material Icons Search](https://mui.com/material-ui/material-icons/)
- [Material UI Store](https://mui.com/store/) - Premium templates and themes
