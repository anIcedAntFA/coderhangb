import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { DATE_FORMAT, TIMEZONE } from '@/config/datetime.config';

dayjs.extend(utc);
dayjs.extend(timezone);

interface DatetimeOptions {
	pubDatetime: string | Date;
	modDatetime: string | Date | null | undefined;
	timezone?: string;
}

export interface FormattedDatetime {
	isModified: boolean;
	isoDatetime: string;
	displayDatetime: string;
}
/**
 * Formats publication and modification dates for display in a blog post.
 * @param {DatetimeOptions} options - The date options.
 * @returns {FormattedDatetime} An object with formatted date strings and metadata.
 */
export const formatPostDatetime = ({
	pubDatetime,
	modDatetime,
	timezone: postTimezone,
}: DatetimeOptions): FormattedDatetime => {
	// 1. Determine if the post has been modified.
	// A post is considered modified only if a modification date exists AND it's after the publication date.
	const isModified = modDatetime && dayjs(modDatetime).isAfter(pubDatetime);

	// 2. Select the correct date to display.
	// If the post is modified, show the modification date; otherwise, show the original publication date.
	const datetimeToShow = isModified ? modDatetime : pubDatetime;

	// 3. Convert the selected date to the target timezone.
	// It prioritizes the timezone passed in props, otherwise falls back to the site's default timezone.
	const datetime = dayjs(datetimeToShow).tz(
		postTimezone || TIMEZONE.asiaBangkok,
	);

	// 4. Generate formatted date strings.
	// The ISO string is a machine-readable, standardized format, crucial for SEO and the <time> element's datetime attribute.
	const isoDatetime = datetime.toISOString();

	// The display string is a human-readable format, based on our constant.
	const displayDatetime = datetime.format(DATE_FORMAT.humanReadable);

	return {
		isModified: Boolean(isModified),
		isoDatetime,
		displayDatetime,
	};
};
