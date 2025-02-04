// File: FormTracker.tsx
import React, { useEffect } from 'react';
import './FormTracker.scss';
import { useSelector, useDispatch } from "react-redux";
import { selectStepState } from '@/slices/stepSlice';


const FormTracker: React.FC = () => {
  const { step, nextStep, totalSteps } = useSelector(selectStepState); // Получаем шаг и функцию для перехода на следующий шаг
  console.log('FormTracker nextStep:', nextStep); 
  const segments = 3; // Количество сегментов
  const stepsPerSegment = Math.ceil(totalSteps / segments); // Шаги в каждом сегменте (с округлением вверх)

  // Вычислить прогресс для каждого сегмента
  const calculateSegmentProgress = (segmentIndex: number) => {
    const startStep = segmentIndex * stepsPerSegment + 1;
    const endStep = Math.min((segmentIndex + 1) * stepsPerSegment, totalSteps); // Ограничиваем концом общего количества шагов

    if (step >= endStep) {
      return 100; // Полностью заполнено
    } else if (step < startStep) {
      return 0; // Ещё не начато
    } else {
      return ((step - startStep + 1) / (endStep - startStep + 1)) * 100; // Прогресс в процентах
    }
  };

  const handleNextStep = () => {
    if (step < totalSteps) {
      nextStep();
    }
    console.log(step)
  };

  return (
    <div className="p-2">
      <div className="form-tracker flex text-white gap-1">
        {Array.from({ length: segments }).map((_, index) => (
          <div
            key={index}
            className="line h-[2px] w-full min-w-[176px] max-lg:min-w-0 bg-[#3D5D64] relative overflow-hidden rounded-md"
          >
            <div
              className="h-full bg-[linear-gradient(266.66deg,_#5CB170_-7.81%,_#D6DE6D_118.14%)] absolute top-0 left-0"
              style={{
                width: `${calculateSegmentProgress(index)}%`,
                transition: 'width 0.3s ease',
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormTracker;
