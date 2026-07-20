const commandHandlers = {
    help: () => {
        return {
            output: [
                'Available commands:',
                '  help   - 명령어 목록 출력',
                '  echo   - 입력한 문자열 출력',
                '  clear  - 터미널 화면 초기화',
                '  logout - 로그아웃',
            ],
        };
    },

    echo: ({ args }) => {
        return {
            output: [args.join(' ')],
        };
    },

    clear: () => {
        return {
            output: [],
            clear: true,
        };
    },

    logout: () => {
        return {
            output: ['Logout successful.'],
            logout: true,
            route: '/login',
        };
    },
};

export function executeCommand(input) {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
        return {
            output: [],
        };
    }

    const [commandName, ...args] =
        trimmedInput.split(/\s+/);

    const normalizedCommand =
        commandName.toLowerCase();

    const commandHandler =
        commandHandlers[normalizedCommand];

    if (!commandHandler) {
        return {
            output: [
                `command not found: ${commandName}`,
                `Type "help" to see available commands.`,
            ],
        };
    }

    return commandHandler({
        args,
        rawInput: trimmedInput,
    });
}