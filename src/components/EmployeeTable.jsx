import { useEffect, useState } from "react";
import styles from "./EmployeeTable.module.css"

export default function EmployeeTable(){
 const [employee,setEmployee]=useState([]);
 const [currentPage,setCurrentPage]=useState(1);
 const[totalP,setTotalPage]=useState(1)
const RowsPerPage=10;

 useEffect(()=>{
   const fetchData=async()=>{
   try {
    const resp= await fetch( "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
    const data=await resp.json();
     setEmployee(data);
     setTotalPage(Math.ceil(data.length/RowsPerPage));
    
   } catch (error) {
    alert("failed to fetch data");
     console.error("Error fetching data",error);
   }

   } 

   fetchData();
 },[])  
  

 const idxLastRow= currentPage * RowsPerPage;
 const idxFirstRow= idxLastRow - RowsPerPage;
 const currentEmply= employee.slice(idxFirstRow, idxLastRow);

 const handleNext=()=>{
    if(currentPage==1){
        setCurrentPage(currentPage + 1);
    }

 }
 
 const handlePrev=()=>{
    
    if(currentPage>1){
        setCurrentPage(currentPage - 1);
    }
 }
    return (

       <div className={styles.container}>
        <h2 className={styles.header}>Employee Data Table</h2>
       <table className={styles.table}>
          <thead>
              <tr>
                <th className={styles.th}>ID</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Role</th>
              </tr>
          </thead>
          <tbody>
            {currentEmply.map((employee,index)=>(
             <tr key={index} className={styles.row}>
               <td className={styles.td}>{idxFirstRow + index + 1}</td> 
               <td className={styles.td}>{employee.name}</td> 
               <td className={styles.td}>{employee.email}</td> 
               <td className={styles.td}>{employee.role}</td> 


             </tr>
            ))}
             
          </tbody>

       </table>


       <div className={styles.pagination}>
        <button
         className={styles.button}
         onClick={handlePrev}
         disabled={currentPage===1}

          
         >
            Previous
            
         </button>
         <span className={styles.pageNumber}>{currentPage}</span>
         <button
         className={styles.button}
         onClick={handleNext}
         disabled={currentPage===totalP}

          
         >
            Next
            
         </button>
         
       
           
       </div>
 
       </div>
    )
}