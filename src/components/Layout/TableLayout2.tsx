import React, { useEffect, useState, ChangeEvent } from "react";

interface TableLayoutProps {
    data: Record<string, any>[];
    title: string;
    headings: Record<string, string>;
    topRightButtonText: string;
    actionsText: React.ReactNode[];
    onTopRightButtonAction: () => void;
    onClickAction1: (index: number) => void;
    onClickAction2: (index: number) => void;
    onClickAction3: (index: number) => void;
    actionCheckbox?: boolean[];
    customComponents?: Record<string, React.ComponentType<{ data: any, rowIndex: number }>>;
}

const TableLayout2: React.FC<TableLayoutProps> = ({
    data,
    title,
    headings,
    topRightButtonText,
    actionsText,
    onTopRightButtonAction,
    onClickAction1,
    onClickAction2,
    onClickAction3,
    actionCheckbox,
    customComponents,
}) => {
    const [tableHeaders, setTableHeaders] = useState<string[]>([]);
    const [tableBody, setTableBody] = useState<Record<string, any>[]>([]);
    const [searchQ, setSearchQ] = useState<string>("");
    const headingsKeys = Object.keys(headings);

    const hasTextMatches = (string1: string, string2: string) => {
        if (typeof string1 !== 'string' || typeof string2 !== 'string') {
        return false;
        }
        return string2.toLowerCase().includes(string1.toLowerCase());
    }
    
    useEffect(() => {
        const body = getTableBody();
        const searchResult = body.filter((row) =>
        headingsKeys.some((key) =>
            hasTextMatches(searchQ, row[key])
        )
        );
        setTableBody(searchQ === '' ? body : searchResult);
    }, [searchQ, data]);

    const getTableBody = () => {
        return data.map((item, _index) => {
        const row: Record<string, any> = { index: _index };
        headingsKeys.forEach((key) => {
            row[key] = item[headings[key]];
        });
        return row;
        });
    };

    useEffect(() => {
        setTableHeaders(headingsKeys);
        const body = getTableBody();
        setTableBody(body);
    }, [data]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQ(e.target.value);
    };

    // ON CLICK EVENTS

    const _onClickAction1 = (index: number) => onClickAction1(index);
    const _onClickAction2 = (index: number) => onClickAction2(index);
    const _onClickAction3 = (index: number) => onClickAction3(index);
    const _onTopRightButtonAction = () => onTopRightButtonAction();

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className="text-2xl leading-tight">{title}</h2>
                    <div className="text-end">
                        <div className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                            <div className="relative">
                                <input
                                type="text"
                                id="form-subscribe-Filter"
                                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-full text-base focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                placeholder="search"
                                onChange={handleSearch}
                                />
                            </div>
                            {/* <button
                                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-black rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200"
                                onClick={_onTopRightButtonAction}
                            >
                                {topRightButtonText}
                            </button> */}
                        </div>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    {tableHeaders.map((heading, i) => (
                                        <th
                                            key={i}
                                            scope="col"
                                            className="px-5 py-3 bg-white font-semibold border-b border-gray-100 text-gray-800 text-left text-sm uppercase font-normal"
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                    {actionsText && actionsText.length > 0 &&
                                        actionsText.map((_, i) => (
                                            <th
                                                key={i}
                                                scope="col"
                                                className="px-1 py-1 bg-white font-semibold border-b border-gray-100 text-gray-800 text-left text-sm uppercase font-normal"
                                            >
                                                {" "}
                                            </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableBody.map((body, i) => (
                                    <tr key={i}>
                                        {headingsKeys.map((key, j) => {
                                            const CustomComponent = customComponents && customComponents[key];
                                            return (
                                                <td
                                                    key={j}
                                                    className="px-5 py-4 border-b border-gray-100 bg-white text-sm"
                                                >
                                                    {CustomComponent ? (
                                                        <div className="pl-7 -mt-5">
                                                            <CustomComponent data={body[key]} rowIndex={i} />
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-900 whitespace-no-wrap line-clamp-1 hover:line-clamp-none cursor-pointer">
                                                            {body[key]}
                                                        </p>
                                                    )}
                                                </td>
                                            );
                                        })}
                                        {actionsText && actionsText.length > 0 &&
                                        actionsText.map((actionItem, k) => (
                                            <td
                                                key={k}
                                                className="px-4 py-3 border-b border-gray-200 bg-white text-lg"
                                            >
                                                <button
                                                    className="text-gray-600 hover:text-red-600"
                                                    onClick={() => {
                                                    switch (k) {
                                                        case 0:
                                                        _onClickAction1(i);
                                                        break;
                                                        case 1:
                                                        _onClickAction2(i);
                                                        break;
                                                        case 2:
                                                        _onClickAction3(i);
                                                        break;
                                                    }
                                                    }}
                                                >
                                                    {actionItem}
                                                </button>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableLayout2;
