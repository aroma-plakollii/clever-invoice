import {FaCaretDown, FaFileInvoice, FaMoneyCheck, FaUserAlt} from "react-icons/fa";
import {FaBagShopping, FaCaretUp} from "react-icons/fa6";
import {Invoice} from "@/app/types/invoice";
import {Setting} from "@/app/types/setting";
import {LineChart} from "@/app/components/dashboardComponents/charts/LineChart";
import {MdLinearScale} from "react-icons/md";

interface DataCardProps {
    name: string,
    number: number | string;
    percentage: any;
    dayLabels: any;
    dailyCounts: any;
    monthlyCounts: any;
    momChanges: any;
    momTrend: any;
}

export const DataCard: React.FC<DataCardProps> = (props) => {
  return(
      <div className="shadow-2xl rounded-2xl p-5">
          <div className="flex items-center mb-3">
              {props.name === "Clients" && <FaUserAlt className="text-3xl text-white bg-green-600 rounded-md p-2"/>}
              {props.name === "Products" && <FaBagShopping className="text-3xl text-white bg-yellow-300 rounded-md p-2"/>}
              {props.name === "Invoices" && <FaFileInvoice className="text-3xl text-white bg-blue-600 rounded-md p-2"/>}
              {props.name === "Amount" && <FaMoneyCheck className="text-3xl text-white bg-orange-600 rounded-md p-2"/>}
              <p className="text-gray-500 ml-2">{props.name}</p>
          </div>
          <div className="flex items-center mb-3">
              <p className="text-4xl font-bold mr-6">{`${props.number}${props.name === "Amount" ? '€' : ''}`}</p>
              <div className="w-36 h-auto">
                  <LineChart name={props.name} monthlyCounts={props.monthlyCounts} dailyCounts={props.dailyCounts} momChanges={props.momChanges} dayLabels={props.dayLabels} />
              </div>
          </div>
          <div className="flex items-center">
              <div className={`flex items-center
               ${props.momTrend === "increase" && 'bg-green-100 ring-green-300'}
               ${props.momTrend === "decrease" && 'bg-red-100 ring-red-300'}
               ${props.momTrend === "no change" && 'bg-gray-100 ring-gray-300'}
                ring-1 px-2 py-1 rounded-md`}>
                  {props.momTrend === "increase" && <FaCaretUp className="text-xs text-green-600" />}
                  {props.momTrend === "decrease" && <FaCaretDown className="text-xs text-red-600" />}
                  {props.momTrend === "no change" && <MdLinearScale className="text-xs text-gray-600" />}
                  <p className={`text-xs 
                    ${props.momTrend === "increase" && 'text-green-600'}
                   ${props.momTrend === "decrease" && 'text-red-600'}
                   ${props.momTrend === "no change" && 'text-gray-600'}
                   ml-1`}>{props.percentage}%</p>
              </div>
              <p className="text-xs text-gray-500 ml-1.5">this month</p>
          </div>
      </div>
  )
}