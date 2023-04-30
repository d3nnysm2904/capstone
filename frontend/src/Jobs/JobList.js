import React, { useEffect, useState } from "react";
import JoblyApi from "../API/Api";
import JobCard from "./JobCard";
import SearchForm from "../Middleware/SearchForm";

const JobsList = () =>
{
    const [ jobs, setJobs ] = useState( [] );

    useEffect( function PreLoadInfo ()
    {
        async function getJobs ()
        {
            Search();
        }
        getJobs();
    }, [] );

    async function Search ( name )
    {
        const res = await JoblyApi.getJobs( name );
        setJobs( res );
    }

    return (
        <>
            <div>
                <SearchForm search={ Search } />
            </div>
            { jobs.map( ( j ) => (
                <div
                    key={ j.id }
                    style={ {
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1px",
                    } }
                >
                    <JobCard job={ j } />
                </div>
            ) ) }
        </>
    );
};

export default JobsList;
