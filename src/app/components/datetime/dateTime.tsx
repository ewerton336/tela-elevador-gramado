import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const DateTime = () => {
  const [brasilTime, setBrasilTime] = useState("");

  useEffect(() => {
    const updateBrasilTime = () => {
      const now = new Date();
      const timezoneOffset = now.getTimezoneOffset();
      const brasiliaOffset = -180; // Brasília está em UTC-3
      const offsetDifference = timezoneOffset + brasiliaOffset;
      const adjustedTime = new Date(
        now.getTime() + offsetDifference * 60 * 1000
      );
      setBrasilTime(format(adjustedTime, "dd/MM/yyyy HH:mm:ss"));
    };

    updateBrasilTime();
    const interval = setInterval(updateBrasilTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      Data e Hora: {brasilTime}
    </div>
  );
};

export default DateTime;
