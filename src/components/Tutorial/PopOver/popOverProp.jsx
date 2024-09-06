import "./popOver.css";
import React from "react";

const HighlightDescription = ({ direction, content }) => {
    return (
        <div
            className={
                direction === 'left' || direction === 'right'
                    ? direction === 'left'
                        ? 'flex justify-center items-center z-[200] max-w-[250px] popover-left relative'
                        : 'flex justify-center items-center z-[200] max-w-[250px] popover-right relative'
                    : direction === 'bottom'
                        ? 'flex flex-col justify-center items-center z-[200] max-w-[320px] popover-bottom relative'
                        : direction === 'top' ? 'flex flex-col justify-center items-center z-[200] max-w-[320px] popover-top relative' : 'none'
            }
        >
            <div className='z-[200] flex items-center px-3 py-2 text-xl rounded-xl bg-bgColor-100 relative'>
                <div className="disc">
                    {content}
                </div>

            </div>
        </div>
    );
};
export default HighlightDescription;