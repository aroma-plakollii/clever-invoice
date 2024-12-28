import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";

interface DatepickerOptions {
    title: string;
    autoHide: boolean;
    todayBtn: boolean;
    clearBtn: boolean;
    clearBtnText: string;
    maxDate: Date;
    minDate: Date;
    theme: {
        background: string;
        todayBtn: string;
        clearBtn: string;
        icons: string;
        text: string;
        disabledText: string;
        input: string;
        inputIcon: string;
        selected: string;
    };
    icons: {
        prev: () => JSX.Element;
        next: () => JSX.Element;
    };
    datepickerClassNames: string;
    defaultDate: Date;
    language: string;
    disabledDates: Date[];
    weekDays: string[];
    inputNameProp: string;
    inputIdProp: string;
    inputPlaceholderProp: string;
    inputDateFormatProp: {
        day: "numeric" | "2-digit";
        month: "numeric" | "2-digit" | "long" | "short" | "narrow";
        year: "numeric" | "2-digit";
    };
}

// Define the options
export const options: DatepickerOptions = {
    title: "Due Date Payment",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2060-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "shadow-2xl",
        todayBtn: "",
        clearBtn: "",
        icons: "bg-gray-200",
        text: "",
        disabledText: "",
        input: "bg-white py-2 sm:py-2.5",
        inputIcon: "",
        selected: "bg-black hover:text-white",
    },
    icons: {
        prev: () => <ArrowLeftIcon className="text-gray-500 h-5 w-5" />,
        next: () => <ArrowRightIcon className="text-gray-500 h-5 w-5" />,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date(),
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
        day: "numeric",
        month: "long",
        year: "numeric",
    },
};