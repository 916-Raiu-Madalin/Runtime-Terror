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
    const years = ["1", "2", "3"]
    const [grp, setGrp] = useState('')
    const [year, setYear] = useState('')
    const options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Students in group ' + grp,
        useTextFile: false,
        useBom: true,
        headers: ['Name', 'Group', 'Year', 'Grade'] // - update to use grade
      };
    const csvExporter = new ExportToCsv(options);

    const handleChange = (event) => {
        setGrp(event.target.value);

      };
    const handleChangeYear = (event) => {
      setYear(event.target.value)
    }

    const downloadGroup = ( ) =>{
        if(grp === ''){
            alert('Please select a group first')
            return
        }
        let output = []
        GET("/api/students/"+ grp).then(response => {
          console.log(response.data)
            response.data.map((student) => {
                let stud = [student.name, student.group, student.currentYear]
                switch(student.currentYear){
                  case 1:
                    stud.push(student.year1Grade)
                    break
                  case 2: 
                    stud.push(student.year2Grade)
                    break
                  case 3:
                    stud.push(student.year3Grade)
                    break
                  default:
                    
                }
                output.push(stud)
            })
            csvExporter.generateCsv(output);
        })
    }   

    const downloadYear = () => {
      if(year === ''){
        alert('Please select a year first')
        return
      }
      let output = []
      GET("/api/students/year/"+ year).then(response => {
          response.data.map((student) => {
              let stud = [student.name, student.group, student.currentYear]
              switch(student.currentYear){
                case 1:
                  stud.push(student.year1Grade)
                  break
                case 2: 
                  stud.push(student.year2Grade)
                  break
                case 3:
                  stud.push(student.year3Grade)
                  break
                default:
          }
          output.push(stud)
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
        <Stack direction="row" justifyContent="space-between">
        <FormControl sx={{width: 1/4}}>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="Year"
            onChange={handleChangeYear}
        >
            {years.map((year) => (
                <MenuItem value={year} >{year}</MenuItem>
            ))

            }
        </Select>
        </FormControl>
        <Button variant="contained" onClick={downloadYear} endIcon={<DownloadIcon />}>
          Download
        </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Documents;
