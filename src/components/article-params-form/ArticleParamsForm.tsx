import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useState, useRef } from 'react';
import { Text } from 'components/text';
import stylesText from '../text/index.module.scss';
import { Select } from '../select/Select';
import { fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, ArticleStateType } from '../../constants/articleProps';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator'
import { defaultArticleState } from '../../constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType,
	setCurrentArticleState: (param: any) => void
}

export const ArticleParamsForm = ({
	currentArticleState, setCurrentArticleState
	}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLElement>(null);
	const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
	const [newFontFamily, setNewFontFamily] = useState(currentArticleState.fontFamilyOption);
	const [newFontSize, setNewFontSize] = useState(currentArticleState.fontSizeOption);
	const [newFontColor, setNewFontColor] = useState(currentArticleState.fontColor);
	const [newBackgroundColor, setNewBackgroundColor] = useState(currentArticleState.backgroundColor);
	const [newContentWidth, setNewContentWidth] = useState(currentArticleState.contentWidth);

	const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticleState({...currentArticleState, 
			fontFamilyOption: newFontFamily, 
			fontColor: newFontColor, 
			backgroundColor: newBackgroundColor,
			contentWidth: newContentWidth, 
			fontSizeOption: newFontSize});
	};

	const formResetHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticleState(defaultArticleState);
		setNewFontFamily(defaultArticleState.fontFamilyOption);
		setNewFontSize(defaultArticleState.fontSizeOption);
		setNewFontColor(defaultArticleState.fontColor);
		setNewBackgroundColor(defaultArticleState.backgroundColor);
		setNewContentWidth(defaultArticleState.contentWidth);
	}

	useOutsideClickClose({
		isOpen: isOpenForm,
		rootRef,
		onClose: () => setIsOpenForm(false),
		onChange: setIsOpenForm
	})

	return (
		<>
			<ArrowButton onClick={setIsOpenForm} isOpen={isOpenForm}/>
			<aside 
				ref={rootRef}
				className={clsx(styles.container, isOpenForm && styles.container_open)}>
				<form onSubmit={formSubmitHandler} onReset={formResetHandler} className={styles.form}>
					<Text weight={800} size={31} uppercase={true}>задайте параметры</Text>
					<Select 
						options={fontFamilyOptions}
						selected={newFontFamily}
						onChange={setNewFontFamily}
						title='шрифт'
						/>
					<RadioGroup 
						name='label'
						options={fontSizeOptions}
						selected={newFontSize}
						onChange={setNewFontSize}
						title='размер шрифта'
						/>
					<Select 
						options={fontColors}
						selected={newFontColor}
						onChange={setNewFontColor}
						title='цвет шрифта'
						/>
					<Separator />
					<Select 
						options={backgroundColors}
						selected={newBackgroundColor}
						onChange={setNewBackgroundColor}
						title='цвет фона'
						/>
					<Select 
						options={contentWidthArr}
						selected={newContentWidth}
						onChange={setNewContentWidth}
						title='ширина контента'
						/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
