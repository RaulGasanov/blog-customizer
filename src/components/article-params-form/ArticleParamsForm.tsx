import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';
import { Select } from '../select';
import { Text } from '../text';
import {
	OptionType,
	fontColors,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';

type PropsArticleParamsForm = {
	onSubmit?: (params: ArticleStateType) => void;
	onReset?: (params: ArticleStateType) => void;
	onToggle?: (params: boolean) => void;
	formOp: boolean;
};

export const ArticleParamsForm = (props: PropsArticleParamsForm) => {
	const { onSubmit, onReset, onToggle, formOp } = props;

	const [params, setParams] = useState({
		fontFamilyOption: fontFamilyOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
		fontSizeOption: fontSizeOptions[0],
	});

	useEffect(() => {
		const handlerOpenWidget = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && formOp === true) onToggle?.(false);
		};
		document.addEventListener('keydown', handlerOpenWidget);
		return () => document.removeEventListener('keydown', handlerOpenWidget);
	}, [formOp]);

	const toggler = () => {
		onToggle?.(formOp);
	};

	const cbFonts = (option: OptionType) => {
		setParams({
			...params,
			fontFamilyOption: option,
		});
	};

	const cbColorsFont = (option: OptionType) => {
		setParams({
			...params,
			fontColor: option,
		});
	};

	const cbColorsBackground = (option: OptionType) => {
		setParams({
			...params,
			backgroundColor: option,
		});
	};

	const cbContentWidth = (option: OptionType) => {
		setParams({
			...params,
			contentWidth: option,
		});
	};

	const cbFontSize = (option: OptionType) => {
		setParams({
			...params,
			fontSizeOption: option,
		});
	};

	const submitParams = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit?.(params);
	};

	const resetStyles = () => {
		setParams(defaultArticleState);
		onReset?.(defaultArticleState);
	};

	const sidebarStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: formOp,
	});

	return (
		<>
			<ArrowButton onClick={toggler} isOpen={formOp} />
			<aside className={sidebarStyle}>
				<form
					className={styles.form}
					onSubmit={submitParams}
					onReset={resetStyles}>
					<fieldset style={{ display: 'grid', gap: 'clamp(10px, 4vh, 50px)' }}>
						<Text size={31} weight={800} uppercase>
							{'Задайте параметры'}
						</Text>
						<Select
							onChange={cbFonts}
							selected={params.fontFamilyOption}
							placeholder='Open Sans'
							title='Шрифт'
							options={fontFamilyOptions}
						/>
						<Select
							onChange={cbColorsFont}
							selected={params.fontColor}
							placeholder={params.fontColor.title}
							title='Цвет шрифта'
							options={fontColors}
						/>
						<Separator />
						<Select
							onChange={cbColorsBackground}
							selected={params.backgroundColor}
							placeholder={params.backgroundColor.title}
							title='Цвет фона'
							options={backgroundColors}
						/>
						<Select
							onChange={cbContentWidth}
							selected={params.contentWidth}
							placeholder={params.contentWidth.title}
							title='Ширина контента'
							options={contentWidthArr}
						/>
						<RadioGroup
							name={params.fontSizeOption.className}
							options={fontSizeOptions}
							selected={params.fontSizeOption}
							onChange={cbFontSize}
							title={'Размер шрифта'}
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
