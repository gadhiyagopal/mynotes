import React from 'react'

export default function SingleNote() {

    const { title , description , tag } = props.note;

  return (
    <>
    
    <div className="col-4 my-2">
        <div className="card">
            <div className="card-header fw-bold">
                {title}

                <span className="float-end">
                    <span className={`badge ${ tag==="personal" ? "text-bg-danger" : "text-bg-success"}`}>{tag}</span>
                    <i class="fa-solid fa-pencil px-4 "></i>
                    <i class="fa-solid fa-trash text-danger"></i>
                </span>
            </div>
            <div className="card-body">
                <div className="card-text">
                    {description}
                </div>
            </div>
        </div>
    </div>
    
    </>
  )
}
