import React, { useContext, useState } from "react";
import "./JobCard.css";
import UserContext from "../UseContext";
import JoblyApi from "../API/Api";

const JobCard = ( { job } ) =>
{
    const { currUser } = useContext( UserContext );
    const [ reRender, setReRender ] = useState( false );

    const Aplied = () =>
    {
        return currUser.applications?.includes( job?.id );
    };

    const Apply = () =>
    {
        try
        {
            JoblyApi.applyForJob( currUser.username, job.id );
            currUser.applications.push( currUser.username, job.id );
            setReRender( !reRender );
        } catch ( error )
        {
            console.log( error );
        }
    };

    return (
        <>
            <div className="card JobCard" style={ { width: "60vw" } }>
                <div className='card-header' >{ job.title }</div>
                <div className="card-body">
                    <div>
                        <p className="card-text"> Salary: { job.salary }</p>
                        <p className="card-text"> Equity: { job.equity }</p>
                    </div>
                    { !Aplied() ? (
                        <button onClick={ Apply } className="btn btn-primary">
                            Apply
                        </button>
                    ) : (
                            <button disabled className="btn btn-success">
                            Applied
                        </button>
                    ) }
                </div>
            </div>
        </>
    );
};

export default JobCard;
