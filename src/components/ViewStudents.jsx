import Button from "@mui/material/Button";
import Select from "react-select";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useEffect, useState } from "react";

import { getStudentsByNationality } from "../services/studentsService";
import { StudentContext } from "../utils/studentContext";

function ViewStudents() {
  const { newNationality } = useContext(StudentContext);
  const [students, setStudents] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedNationality, setSelectedNationality] = useState(
    newNationality || ""
  );
  const [sortOrder, setSortOrder] = useState(-1);
  const [value, setValue] = useState(
    newNationality ? { label: newNationality, value: newNationality } : null
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getStudentsByNationality();
      setStudents(response.data);
      setIsLoading(false);
    };

    fetchData();

    return () => {
      setStudents({});
    };
  }, []);

  const handleSort = async () => {
    setIsSorting(true);
    setSortOrder((state) => -1 * state);
    setIsSorting(false);
  };

  const handleNationalityChange = (item) => {
    setSelectedNationality(item.value);
    setValue(item);
  };

  let nationalities = Object.keys(students);

  nationalities = nationalities.map((nationality) => ({
    value: nationality,
    label: nationality,
  }));

  let rows = nationalities[0] ? students[nationalities[0].value] : [];
  let studentRows = students[selectedNationality]
    ? students[selectedNationality]
    : [];

  let initialValue = nationalities[0];
  if (sortOrder === 1) {
    studentRows.sort((a, b) => {
      let fa = a.firstName.toLowerCase(),
        fb = b.firstName.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  } else if (sortOrder === -1) {
    studentRows.sort((a, b) => {
      let fa = a.firstName.toLowerCase(),
        fb = b.firstName.toLowerCase();

      if (fa > fb) {
        return -1;
      }
      if (fa < fb) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Select
          value={value || initialValue}
          options={nationalities}
          onChange={handleNationalityChange}
        />
      )}

      <br />

      {selectedNationality === "" &&
        rows.map((student) => (
          <div key={student._id}>
            <Typography>
              {student.firstName} {student.lastName} ({student.age})
            </Typography>
          </div>
        ))}
      {studentRows.map((student) => (
        <div key={student._id}>
          <Typography>
            {student.firstName} {student.lastName} ({student.age})
          </Typography>
        </div>
      ))}

      <div>
        {isSorting ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" onClick={handleSort}>
            Sort
          </Button>
        )}
      </div>
    </div>
  );
}

export default ViewStudents;
