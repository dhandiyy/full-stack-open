type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number, b: number, op: Operation): number => {
    switch (op) {
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) throw new Error('Can\'t divide by 0!');
            return a / b;
        case 'add':
            return a + b;
        default:
            throw new Error('Operation is not multiply, add or divide!');
    }
}

//this just do once
// try {
//     console.log(calculator(1, 0 , 'divide'));
// } catch (error: unknown) {
//     let errorMessage = 'Something went wrong: '
//     if (error instanceof Error) {
//         errorMessage += error.message;
//     }
//     console.log(errorMessage);
// }

//like object define
interface MultiplyValues {
    value1: number,
    value2: number
}

const parseArgument = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText, a * b);
}

try {
    const {value1, value2} = parseArgument(process.argv);
    multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
} catch (error: unknown){
    let errorMessage = 'Something bad happens. '
    if (error instanceof Error){
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage)
}


