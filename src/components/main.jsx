import React from "react";
import EmployeeForm from "./form";
import MakeTable from "./table";

export default function Main (){

    const [allEmployeeData, setAllEmployeeData] = React.useState([]);

    const addEmployeeToDB = async (employeeData) => {
        try {
            await fetch(`http://localhost:3001/employeeDetails`,{
                method : "POST",
                body : JSON.stringify(employeeData),
                headers : {"Content-Type" : "application/json"}
            });
            getEmployeeData();
        } catch (error) {
            console.log(error)
        }
    }

    const getEmployeeData = async () => {
        try {
            let response =await fetch(`http://localhost:3001/employeeDetails`);
            let result = await response.json();
            setAllEmployeeData(result);
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(()=>{
        getEmployeeData();
    },[]);

    return (
        <>
        <EmployeeForm addEmployeeToDB={addEmployeeToDB} />
        <MakeTable allEmployeeData={allEmployeeData}/>
        </>
    )
}