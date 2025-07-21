import React from 'react';

const DateTimeDisplay = ({ timezone }) => {
    // Get current UTC time in milliseconds
    const nowUTC = new Date().getTime() + new Date().getTimezoneOffset() * 60000;

    // Apply the timezone offset from API (in seconds)
    const localTime = new Date(nowUTC + timezone * 1000);

    const time = localTime.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const weekday = localTime.toLocaleDateString('en-GB', { weekday: 'long' });
    const day = localTime.getDate();
    const monthShort = localTime.toLocaleString('en-GB', { month: 'short' });
    const yearShort = localTime.getFullYear().toString().slice(-2);

    const formatted = `${time} - ${weekday}, ${day} ${monthShort} '${yearShort}`;

    return formatted;
};

export default DateTimeDisplay;
