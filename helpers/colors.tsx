import { MantineTheme } from "@mantine/core";

const getCourseBackgroundColors = (theme: MantineTheme) => {
	return [
		theme.colors.blue[5],
		theme.colors.red[5],
		theme.colors.green[5],
		theme.colors.orange[5],
		theme.colors.grape[5],
		theme.colors.teal[5],
	];
};

function chooseColorRecursively(
	index: number,
	courseBackgroundColors: string[]
): string {
	if (index < courseBackgroundColors.length) {
		return courseBackgroundColors[index];
	} else {
		return chooseColorRecursively(
			index - courseBackgroundColors.length,
			courseBackgroundColors
		);
	}
}

export { getCourseBackgroundColors, chooseColorRecursively };
