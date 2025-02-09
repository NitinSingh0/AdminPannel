import React from 'react'
import OptionInputTile from '../input/OptionInputTile';
import Rating from '../input/Rating';

const PollContent = ({
    type,
    options,
    selectedOptionIndex,
    onOptionSelect,
    rating,
    onRatingChange,
    userResponse,
    onResponseChange,
}) => {
    switch (type) {
        case "single-choice":
        case "yes/no":
            return (
                <>
                    {options?.map((option, index) => (
                        <OptionInputTile key={option._id}
                            isSelected={selectedOptionIndex === index}
                            label={option.optionText || ""}
                            onSelect={() => onOptionSelect(index)}
                        />
                    ))}
                </>
            );
        case "rating":
            return <Rating value={rating} onChange={onRatingChange} />;
        default:
            return null;
  }
}

export default PollContent
