import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO, isWithinInterval, addDays } from "date-fns";

interface PeriodEntry {
  id: number;
  date: string;
  flow?: string;
  symptoms?: string[];
  notes?: string;
}

interface PeriodCalendarProps {
  entries: PeriodEntry[];
  selectedDate?: Date;
  onDateSelect: (date: Date | undefined) => void;
}

export default function PeriodCalendar({ entries, selectedDate, onDateSelect }: PeriodCalendarProps) {
  const getPeriodDates = () => {
    const periodDates: Date[] = [];
    
    entries.forEach(entry => {
      const entryDate = parseISO(entry.date);
      // Add 5 days for average period length
      for (let i = 0; i < 5; i++) {
        periodDates.push(addDays(entryDate, i));
      }
    });
    
    return periodDates;
  };

  const getFertileDates = () => {
    const fertileDates: Date[] = [];
    
    entries.forEach(entry => {
      const entryDate = parseISO(entry.date);
      // Add fertile window (typically days 12-16 of cycle)
      for (let i = 12; i < 16; i++) {
        fertileDates.push(addDays(entryDate, i));
      }
    });
    
    return fertileDates;
  };

  const periodDates = getPeriodDates();
  const fertileDates = getFertileDates();

  const modifiers = {
    period: periodDates,
    fertile: fertileDates,
    selected: selectedDate ? [selectedDate] : [],
  };

  const modifiersStyles = {
    period: {
      backgroundColor: '#fecaca',
      color: '#7f1d1d',
      fontWeight: 'bold',
    },
    fertile: {
      backgroundColor: '#bfdbfe',
      color: '#1e3a8a',
      fontWeight: 'bold',
    },
    selected: {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
  };

  const getEntryForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return entries.find(entry => entry.date === dateStr);
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className="rounded-md border"
      />
      
      {selectedDate && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">
              {format(selectedDate, 'MMMM dd, yyyy')}
            </h3>
            
            {(() => {
              const entry = getEntryForDate(selectedDate);
              const isPeriodDay = periodDates.some(date => 
                format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
              );
              const isFertileDay = fertileDates.some(date => 
                format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
              );
              
              return (
                <div className="space-y-2">
                  {isPeriodDay && (
                    <Badge className="bg-red-100 text-red-800">Period Day</Badge>
                  )}
                  {isFertileDay && (
                    <Badge className="bg-blue-100 text-blue-800">Fertile Window</Badge>
                  )}
                  
                  {entry ? (
                    <div className="space-y-2">
                      {entry.flow && (
                        <div className="text-sm">
                          <span className="font-medium">Flow: </span>
                          <Badge variant="outline">{entry.flow}</Badge>
                        </div>
                      )}
                      {entry.symptoms && entry.symptoms.length > 0 && (
                        <div className="text-sm">
                          <span className="font-medium">Symptoms: </span>
                          {entry.symptoms.join(', ')}
                        </div>
                      )}
                      {entry.notes && (
                        <div className="text-sm">
                          <span className="font-medium">Notes: </span>
                          {entry.notes}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No data for this date</p>
                  )}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
