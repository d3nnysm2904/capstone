import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ( { company } ) =>
{
    return (
        <Link className="card CompanyCard" to={ `/companies/${ company.handle }` }>
            <div
                className="card-header"

            >
                { company.name }
            </div>
            <div className="card-body">
                <p className="card-text">{ company.description }</p>
                { company.logoUrl ? (
                    <img alt="" className="float-right" src={ company.logoUrl } />
                ) : (
                    ""
                ) }
            </div>
        </Link>
    );
};

export default CompanyCard;
