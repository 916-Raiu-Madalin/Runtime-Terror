import {React, useState} from "react";
import { Box, Button, Typography, Stack, Paper, Divider } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DownloadIcon from "@mui/icons-material/Download";
import { GET } from "../api/requests";
import { ExportToCsv } from "export-to-csv";

const Documents = () => {
    const groups = ["921", "922", "923", "931", "932", "933"]
    const [grp, setGrp] = useState('')
    const options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Students in group ' + grp,
        useTextFile: false,
        useBom: true,
        headers: ['Name', 'Group'] // - update to use grade
      };
    const csvExporter = new ExportToCsv(options);
    const handleChange = (event) => {
        setGrp(event.target.value);
      };

    const downloadGroup = ( ) =>{
        if(grp === ''){
            alert('Please select a group first')
            return
        }
        let output = []
        GET("/api/students/"+ grp).then(response => {
            response.data.map((student) => {
                output.push([student.name, student.group])
            })
            csvExporter.generateCsv(output);
        })

    }   
  return (
    <Stack
      spacing={3}
      component={Paper}
      divider={<Divider />}
      sx={{
        minWidth: "auto",
        maxWidth: 860,
        marginTop: 5,
        marginLeft: "auto",
        marginRight: "auto",
        padding: "2rem",
      }}
    >
      <Box>
        <Typography>
          Download the student list by group. It cointains the students ordered
          by their proffesional results.
        </Typography>
        <Stack direction="row" justifyContent="space-between">
        <FormControl sx={{width: 1/4}}>
        <InputLabel id="demo-simple-select-label">Group</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={grp}
            label="Group"
            onChange={handleChange}
        >
            {groups.map((group) => (
                <MenuItem value={group} >{group}</MenuItem>
            ))

            }
        </Select>
        </FormControl>
        <Button variant="contained" onClick={downloadGroup} endIcon={<DownloadIcon />}>
          Download
        </Button>
        </Stack>
      </Box>
      <Box>
        <Typography>
          Download the student list by year. It cointains the students ordered
          by their proffesional results.
        </Typography>
        <Button variant="contained" endIcon={<DownloadIcon />}>
          Download
        </Button>
      </Box>
    </Stack>
  );
};

export default Documents;
