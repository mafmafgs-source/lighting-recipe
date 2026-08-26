// ============================================================================
//  Lighting Recipe — 共有 i18n（多言語辞書 + 自動判定 + 手動切替UI）
//  対応言語：ja / en / zh(简体) / ko / de / fr / it / es  （8言語）
//
//  使い方（各HTMLで）：
//    <script src="i18n.js"></script>   ← メインの <script> より前に読み込む
//    以降、既存コードの I18N / I18N_DATA / detectLang / LANG / T はこのファイルが供給する。
//    （各HTML内の const I18N=... / const I18N_DATA=... / detectLang / LANG / T の定義は削除する）
//
//  切替UI：ページ右上に自動で言語セレクタを注入。選択は localStorage 'lr_lang' に保存し、
//          変更時はページを再読み込みして全UIに反映（DOM再構築の複雑さを回避＝確実）。
//
//  ⚠️ de/fr/it/es は初稿（写真用語を考慮した訳）。専門語はネイティブ最終チェック推奨。
// ============================================================================
(function (global) {
  'use strict';

  const I18N = {
    // ────────────────────────────── 日本語 ──────────────────────────────
    ja: {
      // index.html
      photoHint:'📷 タップして写真を追加', locLabel:'📍 ロケーション', locPlaceholder:'スタジオ名・場所など',
      memoLabel:'📝 メモ', memoPlaceholder:'撮影メモ', exCamera:'カメラ', exLens:'レンズ', exDate:'撮影日',
      exF:'F値', exSS:'SS', exISO:'ISO', exFL:'焦点距離', lightingTitle:'ライティング図', bgBtn:'背景',
      editBtn:'＋ 機材編集', legendHigh:'高い', legendLow:'低い', beamTitle:'💡 光パーツ（選択中のライト）',
      beamLabel:'配光', angleLabel:'角度', colorLabel:'色', beamHint:'ライトを選択すると光パーツが表示されます',
      builderBtn:'機材を設定する (Builder)', heightLabel:'高さ', outputLabel:'出力',
      noItems:'機材なし（Builderで追加）', panelTitle:(l)=>`${l} の設定`,
      // builder.html
      cats:{strobe:'ストロボ',video:'ビデオライト',video_stick:'スティック型',panel:'パネル型',modifier:'モディファイア',softbox:'ソフトボックス',umbrella:'アンブレラ',beauty_dish:'ビューティーディッシュ',snoot:'スヌート',grid:'グリッド',stand:'ライトスタンド',boom:'ブームアーム',reflector:'レフ板',flag:'Flag Frame',lens:'レンズ'},
      warehouseTitle:'機材倉庫', catPrompt:'カテゴリを選んでください', builderTitle:'Light Builder', saveBtn:'保存して戻る',
      addCatTile:'カテゴリ追加', assetVaultOnlyNote:'※機材倉庫への追加のみ（図には配置されません）', tapToSet:'タップして設定', addItemRow:'機材を追加', empty:'空',
      dlgCatTitle:'カテゴリを設定', dlgCatNameLabel:'カテゴリ名', dlgCatNamePh:'例：フィルター',
      dlgItemTitle:'機材を追加', dlgMakerLabel:'メーカー名（省略可）', dlgMakerPh:'例：Godox',
      dlgModelLabel:'型番・モデル名', dlgModelPh:'例：AD200Pro', dlgIconLabel:'アイコン（絵文字）',
      cancel:'キャンセル', ok:'OK', alertCatName:'カテゴリ名を入力してください', alertModel:'型番・モデル名を入力してください',
      showMore:(n)=>`残り ${n} 件を表示`, deleteConfirm:(name)=>`「${name}」を削除しますか？`,
      mySetTitle:'マイセット', mySetAddTitle:'マイセットに追加', mySetPickTitle:'追加先のセットを選択',
      mySetAdded:(n)=>`${n} を追加しました`, mySetFull:'このセットは最大5点までです',
      mySetAlready:(n)=>`${n} は既にこのセットにあります`, mySetApplied:(n)=>`${n}点を追加しました`,
      mySetEditTitle:(i)=>`セット${i} を編集`, mySetEditHint:'機材リストの📌ボタンからこのセットに追加できます', close:'閉じる',
    },
    // ────────────────────────────── English ──────────────────────────────
    en: {
      photoHint:'📷 Tap to add photo', locLabel:'📍 Location', locPlaceholder:'Studio name, location...',
      memoLabel:'📝 Memo', memoPlaceholder:'Shooting notes', exCamera:'Camera', exLens:'Lens', exDate:'Date',
      exF:'F', exSS:'SS', exISO:'ISO', exFL:'FL', lightingTitle:'Lighting Diagram', bgBtn:'BG',
      editBtn:'＋ Edit Gear', legendHigh:'High', legendLow:'Low', beamTitle:'💡 Light Beam',
      beamLabel:'Spread', angleLabel:'Angle', colorLabel:'Color', beamHint:'Select a light to edit beam',
      builderBtn:'Set up gear (Builder)', heightLabel:'Height', outputLabel:'Output',
      noItems:'No gear (add in Builder)', panelTitle:(l)=>`${l} Settings`,
      cats:{strobe:'Strobe',video:'Video Light',video_stick:'Stick Light',panel:'Panel',modifier:'Modifier',softbox:'Softbox',umbrella:'Umbrella',beauty_dish:'Beauty Dish',snoot:'Snoot',grid:'Grid',stand:'Light Stand',boom:'Boom Arm',reflector:'Reflector',flag:'Flag Frame',lens:'Lens'},
      warehouseTitle:'Gear Vault', catPrompt:'Select a category', builderTitle:'Light Builder', saveBtn:'Save & Back',
      addCatTile:'Add Category', assetVaultOnlyNote:'Gear vault only (not placed on the diagram)', tapToSet:'Tap to set up', addItemRow:'Add gear', empty:'Empty',
      dlgCatTitle:'Set Category', dlgCatNameLabel:'Category name', dlgCatNamePh:'e.g. Filter',
      dlgItemTitle:'Add Gear', dlgMakerLabel:'Brand (optional)', dlgMakerPh:'e.g. Godox',
      dlgModelLabel:'Model name', dlgModelPh:'e.g. AD200Pro', dlgIconLabel:'Icon (emoji)',
      cancel:'Cancel', ok:'OK', alertCatName:'Please enter a category name.', alertModel:'Please enter a model name.',
      showMore:(n)=>`Show ${n} more`, deleteConfirm:(name)=>`Delete "${name}"?`,
      mySetTitle:'My Set', mySetAddTitle:'Add to My Set', mySetPickTitle:'Choose a set to add to',
      mySetAdded:(n)=>`Added ${n}`, mySetFull:'This set already has 5 items (max).',
      mySetAlready:(n)=>`${n} is already in this set`, mySetApplied:(n)=>`Added ${n} items`,
      mySetEditTitle:(i)=>`Edit Set ${i}`, mySetEditHint:'Add more via the 📌 button in the gear list', close:'Close',
    },
    // ────────────────────────────── 简体中文 ──────────────────────────────
    zh: {
      photoHint:'📷 点击添加照片', locLabel:'📍 拍摄地点', locPlaceholder:'工作室名称、地点',
      memoLabel:'📝 备注', memoPlaceholder:'拍摄备注', exCamera:'相机', exLens:'镜头', exDate:'日期',
      exF:'光圈', exSS:'快门', exISO:'ISO', exFL:'焦距', lightingTitle:'布光图', bgBtn:'背景',
      editBtn:'＋ 编辑器材', legendHigh:'高', legendLow:'低', beamTitle:'💡 光束',
      beamLabel:'光束角', angleLabel:'角度', colorLabel:'颜色', beamHint:'选择灯光以编辑光束',
      builderBtn:'设置器材 (Builder)', heightLabel:'高度', outputLabel:'输出',
      noItems:'无器材（在Builder中添加）', panelTitle:(l)=>`${l} 设置`,
      cats:{strobe:'频闪灯',video:'视频灯',video_stick:'棒形灯',panel:'平板灯',modifier:'附件',softbox:'柔光箱',umbrella:'伞',beauty_dish:'美颜碟',snoot:'束光筒',grid:'蜂窝罩',stand:'灯架',boom:'横臂',reflector:'反光板',flag:'遮光板',lens:'镜头'},
      warehouseTitle:'器材库', catPrompt:'请选择类别', builderTitle:'灯光构建器', saveBtn:'保存并返回',
      addCatTile:'添加类别', assetVaultOnlyNote:'仅添加到器材仓库（不会放置到示意图）', tapToSet:'点击设置', addItemRow:'添加器材', empty:'空',
      dlgCatTitle:'设置类别', dlgCatNameLabel:'类别名称', dlgCatNamePh:'例：滤镜',
      dlgItemTitle:'添加器材', dlgMakerLabel:'品牌（可省略）', dlgMakerPh:'例：Godox',
      dlgModelLabel:'型号', dlgModelPh:'例：AD200Pro', dlgIconLabel:'图标（表情符号）',
      cancel:'取消', ok:'确定', alertCatName:'请输入类别名称。', alertModel:'请输入型号。',
      showMore:(n)=>`显示剩余 ${n} 件`, deleteConfirm:(name)=>`删除「${name}」吗？`,
      mySetTitle:'我的套装', mySetAddTitle:'添加到我的套装', mySetPickTitle:'选择要添加到的套装',
      mySetAdded:(n)=>`已添加 ${n}`, mySetFull:'该套装最多5件', mySetAlready:(n)=>`${n} 已在该套装中`,
      mySetApplied:(n)=>`已添加 ${n} 件`, mySetEditTitle:(i)=>`编辑套装 ${i}`,
      mySetEditHint:'可通过器材列表中的📌按钮添加更多', close:'关闭',
    },
    // ────────────────────────────── 한국어 ──────────────────────────────
    ko: {
      photoHint:'📷 탭하여 사진 추가', locLabel:'📍 촬영 장소', locPlaceholder:'스튜디오 이름, 장소',
      memoLabel:'📝 메모', memoPlaceholder:'촬영 메모', exCamera:'카메라', exLens:'렌즈', exDate:'날짜',
      exF:'조리개', exSS:'셔터', exISO:'ISO', exFL:'초점거리', lightingTitle:'조명 다이어그램', bgBtn:'배경',
      editBtn:'＋ 장비 편집', legendHigh:'높음', legendLow:'낮음', beamTitle:'💡 광원',
      beamLabel:'광각', angleLabel:'각도', colorLabel:'색상', beamHint:'조명을 선택하면 광원이 표시됩니다',
      builderBtn:'장비 설정 (Builder)', heightLabel:'높이', outputLabel:'출력',
      noItems:'장비 없음 (Builder에서 추가)', panelTitle:(l)=>`${l} 설정`,
      cats:{strobe:'스트로브',video:'비디오라이트',video_stick:'스틱라이트',panel:'패널',modifier:'모디파이어',softbox:'소프트박스',umbrella:'우산',beauty_dish:'뷰티디쉬',snoot:'스누트',grid:'그리드',stand:'라이트스탠드',boom:'붐암',reflector:'반사판',flag:'플래그프레임',lens:'렌즈'},
      warehouseTitle:'장비 창고', catPrompt:'카테고리를 선택하세요', builderTitle:'라이트 빌더', saveBtn:'저장 후 돌아가기',
      addCatTile:'카테고리 추가', assetVaultOnlyNote:'장비 창고 추가 전용 (도면에는 배치되지 않음)', tapToSet:'탭하여 설정', addItemRow:'장비 추가', empty:'비어 있음',
      dlgCatTitle:'카테고리 설정', dlgCatNameLabel:'카테고리 이름', dlgCatNamePh:'예: 필터',
      dlgItemTitle:'장비 추가', dlgMakerLabel:'브랜드 (생략 가능)', dlgMakerPh:'예: Godox',
      dlgModelLabel:'모델명', dlgModelPh:'예: AD200Pro', dlgIconLabel:'아이콘 (이모지)',
      cancel:'취소', ok:'확인', alertCatName:'카테고리 이름을 입력하세요.', alertModel:'모델명을 입력하세요.',
      showMore:(n)=>`${n}개 더 보기`, deleteConfirm:(name)=>`「${name}」을 삭제하시겠습니까？`,
      mySetTitle:'마이 세트', mySetAddTitle:'마이 세트에 추가', mySetPickTitle:'추가할 세트를 선택하세요',
      mySetAdded:(n)=>`${n} 추가됨`, mySetFull:'이 세트는 최대 5개까지입니다',
      mySetAlready:(n)=>`${n}은(는) 이미 이 세트에 있습니다`, mySetApplied:(n)=>`${n}개 항목을 추가했습니다`,
      mySetEditTitle:(i)=>`세트 ${i} 편집`, mySetEditHint:'장비 목록의 📌 버튼으로 더 추가할 수 있습니다', close:'닫기',
    },
    // ────────────────────────────── Deutsch (初稿) ──────────────────────────────
    de: {
      photoHint:'📷 Zum Hinzufügen tippen', locLabel:'📍 Ort', locPlaceholder:'Studioname, Ort ...',
      memoLabel:'📝 Notiz', memoPlaceholder:'Aufnahmenotizen', exCamera:'Kamera', exLens:'Objektiv', exDate:'Datum',
      exF:'F', exSS:'SS', exISO:'ISO', exFL:'Brennw.', lightingTitle:'Lichtdiagramm', bgBtn:'HG',
      editBtn:'＋ Equipment', legendHigh:'Hoch', legendLow:'Niedrig', beamTitle:'💡 Lichtkegel',
      beamLabel:'Streuung', angleLabel:'Winkel', colorLabel:'Farbe', beamHint:'Licht wählen, um den Kegel zu bearbeiten',
      builderBtn:'Equipment einrichten (Builder)', heightLabel:'Höhe', outputLabel:'Leistung',
      noItems:'Kein Equipment (im Builder hinzufügen)', panelTitle:(l)=>`Einstellungen ${l}`,
      cats:{strobe:'Blitz',video:'Videoleuchte',video_stick:'Stableuchte',panel:'Panel',modifier:'Lichtformer',softbox:'Softbox',umbrella:'Schirm',beauty_dish:'Beauty Dish',snoot:'Snoot',grid:'Grid',stand:'Lampenstativ',boom:'Galgenstativ',reflector:'Reflektor',flag:'Flag Frame',lens:'Objektiv'},
      warehouseTitle:'Equipment-Lager', catPrompt:'Kategorie wählen', builderTitle:'Light Builder', saveBtn:'Speichern & zurück',
      addCatTile:'Kategorie hinzufügen', assetVaultOnlyNote:'Nur im Equipment-Lager (nicht im Diagramm platziert)', tapToSet:'Zum Einrichten tippen', addItemRow:'Equipment hinzufügen', empty:'Leer',
      dlgCatTitle:'Kategorie festlegen', dlgCatNameLabel:'Kategoriename', dlgCatNamePh:'z. B. Filter',
      dlgItemTitle:'Equipment hinzufügen', dlgMakerLabel:'Marke (optional)', dlgMakerPh:'z. B. Godox',
      dlgModelLabel:'Modellname', dlgModelPh:'z. B. AD200Pro', dlgIconLabel:'Symbol (Emoji)',
      cancel:'Abbrechen', ok:'OK', alertCatName:'Bitte einen Kategorienamen eingeben.', alertModel:'Bitte einen Modellnamen eingeben.',
      showMore:(n)=>`${n} weitere anzeigen`, deleteConfirm:(name)=>`„${name}“ löschen?`,
      mySetTitle:'Mein Set', mySetAddTitle:'Zu „Mein Set“ hinzufügen', mySetPickTitle:'Set zum Hinzufügen wählen',
      mySetAdded:(n)=>`${n} hinzugefügt`, mySetFull:'Dieses Set hat bereits 5 Teile (max.).',
      mySetAlready:(n)=>`${n} ist bereits in diesem Set`, mySetApplied:(n)=>`${n} Teile hinzugefügt`,
      mySetEditTitle:(i)=>`Set ${i} bearbeiten`, mySetEditHint:'Über die 📌-Schaltfläche in der Liste hinzufügen', close:'Schließen',
    },
    // ────────────────────────────── Français (初稿) ──────────────────────────────
    fr: {
      photoHint:'📷 Toucher pour ajouter une photo', locLabel:'📍 Lieu', locPlaceholder:'Nom du studio, lieu ...',
      memoLabel:'📝 Note', memoPlaceholder:'Notes de prise de vue', exCamera:'Appareil', exLens:'Objectif', exDate:'Date',
      exF:'F', exSS:'Vit.', exISO:'ISO', exFL:'Focale', lightingTitle:'Schéma d’éclairage', bgBtn:'Fond',
      editBtn:'＋ Matériel', legendHigh:'Haut', legendLow:'Bas', beamTitle:'💡 Faisceau',
      beamLabel:'Diffusion', angleLabel:'Angle', colorLabel:'Couleur', beamHint:'Sélectionnez une lumière pour régler le faisceau',
      builderBtn:'Configurer le matériel (Builder)', heightLabel:'Hauteur', outputLabel:'Puissance',
      noItems:'Aucun matériel (ajouter dans Builder)', panelTitle:(l)=>`Réglages ${l}`,
      cats:{strobe:'Flash',video:'Lampe vidéo',video_stick:'Tube lumineux',panel:'Panneau',modifier:'Modeleur',softbox:'Softbox',umbrella:'Parapluie',beauty_dish:'Beauty Dish',snoot:'Snoot',grid:'Grille',stand:'Pied d’éclairage',boom:'Bras déporté',reflector:'Réflecteur',flag:'Flag Frame',lens:'Objectif'},
      warehouseTitle:'Réserve de matériel', catPrompt:'Choisir une catégorie', builderTitle:'Light Builder', saveBtn:'Enregistrer et retour',
      addCatTile:'Ajouter une catégorie', assetVaultOnlyNote:'Inventaire uniquement (non placé sur le schéma)', tapToSet:'Toucher pour configurer', addItemRow:'Ajouter du matériel', empty:'Vide',
      dlgCatTitle:'Définir la catégorie', dlgCatNameLabel:'Nom de catégorie', dlgCatNamePh:'ex. : Filtre',
      dlgItemTitle:'Ajouter du matériel', dlgMakerLabel:'Marque (facultatif)', dlgMakerPh:'ex. : Godox',
      dlgModelLabel:'Nom du modèle', dlgModelPh:'ex. : AD200Pro', dlgIconLabel:'Icône (emoji)',
      cancel:'Annuler', ok:'OK', alertCatName:'Veuillez saisir un nom de catégorie.', alertModel:'Veuillez saisir un nom de modèle.',
      showMore:(n)=>`Afficher ${n} de plus`, deleteConfirm:(name)=>`Supprimer « ${name} » ?`,
      mySetTitle:'Mon set', mySetAddTitle:'Ajouter à Mon set', mySetPickTitle:'Choisir le set de destination',
      mySetAdded:(n)=>`${n} ajouté`, mySetFull:'Ce set contient déjà 5 éléments (max.).',
      mySetAlready:(n)=>`${n} est déjà dans ce set`, mySetApplied:(n)=>`${n} éléments ajoutés`,
      mySetEditTitle:(i)=>`Modifier le set ${i}`, mySetEditHint:'Ajoutez via le bouton 📌 dans la liste', close:'Fermer',
    },
    // ────────────────────────────── Italiano (初稿) ──────────────────────────────
    it: {
      photoHint:'📷 Tocca per aggiungere una foto', locLabel:'📍 Luogo', locPlaceholder:'Nome studio, luogo ...',
      memoLabel:'📝 Nota', memoPlaceholder:'Note di scatto', exCamera:'Fotocamera', exLens:'Obiettivo', exDate:'Data',
      exF:'F', exSS:'Tempo', exISO:'ISO', exFL:'Focale', lightingTitle:'Schema luci', bgBtn:'Sfondo',
      editBtn:'＋ Attrezzatura', legendHigh:'Alto', legendLow:'Basso', beamTitle:'💡 Fascio di luce',
      beamLabel:'Diffusione', angleLabel:'Angolo', colorLabel:'Colore', beamHint:'Seleziona una luce per regolare il fascio',
      builderBtn:'Configura attrezzatura (Builder)', heightLabel:'Altezza', outputLabel:'Potenza',
      noItems:'Nessuna attrezzatura (aggiungi in Builder)', panelTitle:(l)=>`Impostazioni ${l}`,
      cats:{strobe:'Flash',video:'Luce video',video_stick:'Luce a barra',panel:'Pannello',modifier:'Modificatore',softbox:'Softbox',umbrella:'Ombrello',beauty_dish:'Beauty Dish',snoot:'Snoot',grid:'Griglia',stand:'Stativo',boom:'Braccio',reflector:'Riflettore',flag:'Flag Frame',lens:'Obiettivo'},
      warehouseTitle:'Magazzino attrezzatura', catPrompt:'Seleziona una categoria', builderTitle:'Light Builder', saveBtn:'Salva e torna',
      addCatTile:'Aggiungi categoria', assetVaultOnlyNote:'Solo nel magazzino (non posizionato sullo schema)', tapToSet:'Tocca per configurare', addItemRow:'Aggiungi attrezzatura', empty:'Vuoto',
      dlgCatTitle:'Imposta categoria', dlgCatNameLabel:'Nome categoria', dlgCatNamePh:'es. Filtro',
      dlgItemTitle:'Aggiungi attrezzatura', dlgMakerLabel:'Marca (facoltativo)', dlgMakerPh:'es. Godox',
      dlgModelLabel:'Nome modello', dlgModelPh:'es. AD200Pro', dlgIconLabel:'Icona (emoji)',
      cancel:'Annulla', ok:'OK', alertCatName:'Inserisci un nome per la categoria.', alertModel:'Inserisci un nome di modello.',
      showMore:(n)=>`Mostra altri ${n}`, deleteConfirm:(name)=>`Eliminare «${name}»?`,
      mySetTitle:'Il mio set', mySetAddTitle:'Aggiungi al mio set', mySetPickTitle:'Scegli il set di destinazione',
      mySetAdded:(n)=>`${n} aggiunto`, mySetFull:'Questo set ha già 5 elementi (max).',
      mySetAlready:(n)=>`${n} è già in questo set`, mySetApplied:(n)=>`${n} elementi aggiunti`,
      mySetEditTitle:(i)=>`Modifica set ${i}`, mySetEditHint:'Aggiungi con il pulsante 📌 nella lista', close:'Chiudi',
    },
    // ────────────────────────────── Español (初稿) ──────────────────────────────
    es: {
      photoHint:'📷 Toca para añadir foto', locLabel:'📍 Ubicación', locPlaceholder:'Nombre del estudio, lugar ...',
      memoLabel:'📝 Nota', memoPlaceholder:'Notas de rodaje', exCamera:'Cámara', exLens:'Objetivo', exDate:'Fecha',
      exF:'F', exSS:'Vel.', exISO:'ISO', exFL:'Focal', lightingTitle:'Esquema de luz', bgBtn:'Fondo',
      editBtn:'＋ Equipo', legendHigh:'Alto', legendLow:'Bajo', beamTitle:'💡 Haz de luz',
      beamLabel:'Difusión', angleLabel:'Ángulo', colorLabel:'Color', beamHint:'Selecciona una luz para editar el haz',
      builderBtn:'Configurar equipo (Builder)', heightLabel:'Altura', outputLabel:'Potencia',
      noItems:'Sin equipo (añadir en Builder)', panelTitle:(l)=>`Ajustes ${l}`,
      cats:{strobe:'Flash',video:'Luz de video',video_stick:'Luz de barra',panel:'Panel',modifier:'Modificador',softbox:'Softbox',umbrella:'Paraguas',beauty_dish:'Beauty Dish',snoot:'Snoot',grid:'Rejilla',stand:'Soporte de luz',boom:'Brazo jirafa',reflector:'Reflector',flag:'Flag Frame',lens:'Objetivo'},
      warehouseTitle:'Almacén de equipo', catPrompt:'Selecciona una categoría', builderTitle:'Light Builder', saveBtn:'Guardar y volver',
      addCatTile:'Añadir categoría', assetVaultOnlyNote:'Solo en el almacén (no se coloca en el esquema)', tapToSet:'Toca para configurar', addItemRow:'Añadir equipo', empty:'Vacío',
      dlgCatTitle:'Definir categoría', dlgCatNameLabel:'Nombre de categoría', dlgCatNamePh:'p. ej. Filtro',
      dlgItemTitle:'Añadir equipo', dlgMakerLabel:'Marca (opcional)', dlgMakerPh:'p. ej. Godox',
      dlgModelLabel:'Nombre del modelo', dlgModelPh:'p. ej. AD200Pro', dlgIconLabel:'Icono (emoji)',
      cancel:'Cancelar', ok:'OK', alertCatName:'Introduce un nombre de categoría.', alertModel:'Introduce un nombre de modelo.',
      showMore:(n)=>`Mostrar ${n} más`, deleteConfirm:(name)=>`¿Eliminar «${name}»?`,
      mySetTitle:'Mi set', mySetAddTitle:'Añadir a Mi set', mySetPickTitle:'Elige el set de destino',
      mySetAdded:(n)=>`${n} añadido`, mySetFull:'Este set ya tiene 5 elementos (máx.).',
      mySetAlready:(n)=>`${n} ya está en este set`, mySetApplied:(n)=>`${n} elementos añadidos`,
      mySetEditTitle:(i)=>`Editar set ${i}`, mySetEditHint:'Añade con el botón 📌 de la lista', close:'Cerrar',
    },
  };

  // ── 追加辞書（index.html のハードコード文字列を回収）─────────────
  //   ここに足したキーは Object.assign で各言語へマージされる。
  const EXTRA = {
    ja: {
      btnReset:'🔄 新規', btnSave:'💾 保存', sunToggle:'☀️ 太陽', bgToggle:'🖼 背景',
      memoCanvasPh:'📝 メモを入力', exportBtn:'↑ 出力', flipBtn:'⇆ 反転',
      resetConfirm:'写真・EXIF・ロケーション・メモ・背景・ライト配置をすべてリセットしますか？',
      replacePhotoConfirm:'写真を差し替えますか？',
      replaceExifConfirm:'EXIF（カメラ・レンズ・撮影日など）も新しい写真のものに差し替えますか？\n\nOK＝差し替える／キャンセル＝今の撮影データを保持',
      subInfo:'サブスクリプション機能は近日公開予定です。\nリリースをお待ちください！',
      exportTitle:'📷 レシピを出力', inclLoc:'📍 ロケーションを含める', inclDate:'📅 撮影日を含める',
      inclCostPre:'💰 機材費用を含める（', inclCostPost:'）', exportGo:'📸 カメラロールに保存',
      saveTitle:'💾 レシピを保存', recipeTitlePh:'レシピのタイトル（例：ポートレート撮影）',
      overwriteWrap:(t)=>`「${t}」を上書きします`, currentRecipe:'現在のレシピ',
      overwriteBtn:'↩ 上書き保存', saveNewBtn:'✨ 新規保存',
      bgSelectTitle:'背景を選択', bgNone:'なし', bgPaper:'背景紙', bgTable:'テーブル', bgMountain:'山脈',
      colorSelect:'🎨 色を選択', subjectSelectTitle:'被写体を選択',
      cameraIconTitle:'カメラアイコン', cameraPick:'📷 自分のカメラの写真を選択', cameraReset:'🔄 アイコンに戻す',
      limitTitle:'📦 保存上限に達しています',
      limitBody:'ゲスト・無料ユーザーは最大30件まで保存できます。新しいレシピを保存するには、マイページで古いレシピを削除するか、サブスクリプションにアップグレードしてください。',
      limitDelete:'🗑 マイページで削除する', limitSub:'✨ サブスクで無制限に保存',
      navRecipe:'レシピ', navGear:'機材倉庫', navMypage:'マイページ',
    },
    en: {
      btnReset:'🔄 New', btnSave:'💾 Save', sunToggle:'☀️ Sun', bgToggle:'🖼 BG',
      memoCanvasPh:'📝 Enter memo', exportBtn:'↑ Export', flipBtn:'⇆ Flip',
      resetConfirm:'Reset all: photo, EXIF, location, memo, background and light layout?',
      replacePhotoConfirm:'Replace the photo?',
      replaceExifConfirm:'Also replace the EXIF (camera, lens, date, etc.) with the new photo\'s data?\n\nOK = replace / Cancel = keep current shooting data',
      subInfo:'Subscription features are coming soon.\nPlease stay tuned!',
      exportTitle:'📷 Export Recipe', inclLoc:'📍 Include location', inclDate:'📅 Include date',
      inclCostPre:'💰 Include gear cost (', inclCostPost:')', exportGo:'📸 Save to camera roll',
      saveTitle:'💾 Save Recipe', recipeTitlePh:'Recipe title (e.g. Portrait shoot)',
      overwriteWrap:(t)=>`Overwrite "${t}"`, currentRecipe:'Current recipe',
      overwriteBtn:'↩ Overwrite', saveNewBtn:'✨ Save as new',
      bgSelectTitle:'Select background', bgNone:'None', bgPaper:'Backdrop', bgTable:'Table', bgMountain:'Mountains',
      colorSelect:'🎨 Select color', subjectSelectTitle:'Select subject',
      cameraIconTitle:'Camera icon', cameraPick:'📷 Choose your camera photo', cameraReset:'🔄 Reset to icon',
      limitTitle:'📦 Storage limit reached',
      limitBody:'Free/guest users can save up to 30 recipes. To save a new one, delete an old recipe on My Page or upgrade to a subscription.',
      limitDelete:'🗑 Delete on My Page', limitSub:'✨ Unlimited with subscription',
      navRecipe:'Recipe', navGear:'Gear', navMypage:'My Page',
    },
    zh: {
      btnReset:'🔄 新建', btnSave:'💾 保存', sunToggle:'☀️ 太阳', bgToggle:'🖼 背景',
      memoCanvasPh:'📝 输入备注', exportBtn:'↑ 导出', flipBtn:'⇆ 翻转',
      resetConfirm:'确定要重置照片、EXIF、地点、备注、背景和灯光布局吗？',
      replacePhotoConfirm:'要替换照片吗？',
      replaceExifConfirm:'是否也用新照片的 EXIF（相机、镜头、拍摄日期等）替换？\n\n确定＝替换／取消＝保留当前拍摄数据',
      subInfo:'订阅功能即将推出。\n敬请期待！',
      exportTitle:'📷 导出配方', inclLoc:'📍 包含地点', inclDate:'📅 包含日期',
      inclCostPre:'💰 包含器材费用（', inclCostPost:'）', exportGo:'📸 保存到相册',
      saveTitle:'💾 保存配方', recipeTitlePh:'配方标题（例：人像拍摄）',
      overwriteWrap:(t)=>`将覆盖「${t}」`, currentRecipe:'当前配方',
      overwriteBtn:'↩ 覆盖保存', saveNewBtn:'✨ 另存为新',
      bgSelectTitle:'选择背景', bgNone:'无', bgPaper:'背景纸', bgTable:'桌面', bgMountain:'山脉',
      colorSelect:'🎨 选择颜色', subjectSelectTitle:'选择被摄体',
      cameraIconTitle:'相机图标', cameraPick:'📷 选择自己的相机照片', cameraReset:'🔄 恢复图标',
      limitTitle:'📦 已达保存上限',
      limitBody:'访客·免费用户最多可保存30个配方。若要保存新配方，请在“我的”页面删除旧配方或升级订阅。',
      limitDelete:'🗑 在“我的”页面删除', limitSub:'✨ 订阅后无限保存',
      navRecipe:'配方', navGear:'器材库', navMypage:'我的',
    },
    ko: {
      btnReset:'🔄 새로', btnSave:'💾 저장', sunToggle:'☀️ 태양', bgToggle:'🖼 배경',
      memoCanvasPh:'📝 메모 입력', exportBtn:'↑ 내보내기', flipBtn:'⇆ 반전',
      resetConfirm:'사진·EXIF·장소·메모·배경·조명 배치를 모두 초기화할까요?',
      replacePhotoConfirm:'사진을 교체할까요?',
      replaceExifConfirm:'EXIF(카메라·렌즈·촬영일 등)도 새 사진의 것으로 교체할까요?\n\n확인＝교체 / 취소＝현재 촬영 데이터 유지',
      subInfo:'구독 기능은 곧 제공될 예정입니다.\n출시를 기다려 주세요!',
      exportTitle:'📷 레시피 내보내기', inclLoc:'📍 장소 포함', inclDate:'📅 날짜 포함',
      inclCostPre:'💰 장비 비용 포함 (', inclCostPost:')', exportGo:'📸 카메라 롤에 저장',
      saveTitle:'💾 레시피 저장', recipeTitlePh:'레시피 제목 (예: 인물 촬영)',
      overwriteWrap:(t)=>`「${t}」을(를) 덮어씁니다`, currentRecipe:'현재 레시피',
      overwriteBtn:'↩ 덮어쓰기', saveNewBtn:'✨ 새로 저장',
      bgSelectTitle:'배경 선택', bgNone:'없음', bgPaper:'배경지', bgTable:'테이블', bgMountain:'산맥',
      colorSelect:'🎨 색상 선택', subjectSelectTitle:'피사체 선택',
      cameraIconTitle:'카메라 아이콘', cameraPick:'📷 내 카메라 사진 선택', cameraReset:'🔄 아이콘으로 되돌리기',
      limitTitle:'📦 저장 한도에 도달',
      limitBody:'게스트·무료 사용자는 최대 30개까지 저장할 수 있습니다. 새 레시피를 저장하려면 마이페이지에서 오래된 레시피를 삭제하거나 구독으로 업그레이드하세요.',
      limitDelete:'🗑 마이페이지에서 삭제', limitSub:'✨ 구독으로 무제한 저장',
      navRecipe:'레시피', navGear:'장비', navMypage:'마이',
    },
    de: {
      btnReset:'🔄 Neu', btnSave:'💾 Speichern', sunToggle:'☀️ Sonne', bgToggle:'🖼 HG',
      memoCanvasPh:'📝 Notiz eingeben', exportBtn:'↑ Export', flipBtn:'⇆ Spiegeln',
      resetConfirm:'Foto, EXIF, Ort, Notiz, Hintergrund und Lichtanordnung zurücksetzen?',
      replacePhotoConfirm:'Foto ersetzen?',
      replaceExifConfirm:'Auch die EXIF-Daten (Kamera, Objektiv, Datum usw.) durch die des neuen Fotos ersetzen?\n\nOK = ersetzen / Abbrechen = aktuelle Aufnahmedaten behalten',
      subInfo:'Abo-Funktionen sind bald verfügbar.\nBleib dran!',
      exportTitle:'📷 Rezept exportieren', inclLoc:'📍 Ort einschließen', inclDate:'📅 Datum einschließen',
      inclCostPre:'💰 Equipment-Kosten (', inclCostPost:')', exportGo:'📸 In Aufnahmen speichern',
      saveTitle:'💾 Rezept speichern', recipeTitlePh:'Rezepttitel (z. B. Porträt-Shooting)',
      overwriteWrap:(t)=>`„${t}“ überschreiben`, currentRecipe:'Aktuelles Rezept',
      overwriteBtn:'↩ Überschreiben', saveNewBtn:'✨ Neu speichern',
      bgSelectTitle:'Hintergrund wählen', bgNone:'Keiner', bgPaper:'Hintergrundpapier', bgTable:'Tisch', bgMountain:'Berge',
      colorSelect:'🎨 Farbe wählen', subjectSelectTitle:'Motiv wählen',
      cameraIconTitle:'Kamera-Symbol', cameraPick:'📷 Eigenes Kamerafoto wählen', cameraReset:'🔄 Symbol zurücksetzen',
      limitTitle:'📦 Speicherlimit erreicht',
      limitBody:'Gäste/Gratis-Nutzer können bis zu 30 Rezepte speichern. Um ein neues zu speichern, lösche auf „Meine Seite“ ein altes Rezept oder wechsle zum Abo.',
      limitDelete:'🗑 Auf „Meine Seite“ löschen', limitSub:'✨ Unbegrenzt mit Abo',
      navRecipe:'Rezept', navGear:'Equipment', navMypage:'Meine Seite',
    },
    fr: {
      btnReset:'🔄 Nouveau', btnSave:'💾 Enregistrer', sunToggle:'☀️ Soleil', bgToggle:'🖼 Fond',
      memoCanvasPh:'📝 Saisir une note', exportBtn:'↑ Exporter', flipBtn:'⇆ Inverser',
      resetConfirm:'Réinitialiser photo, EXIF, lieu, note, fond et disposition des lumières ?',
      replacePhotoConfirm:'Remplacer la photo ?',
      replaceExifConfirm:'Remplacer aussi les EXIF (appareil, objectif, date, etc.) par ceux de la nouvelle photo ?\n\nOK = remplacer / Annuler = conserver les données actuelles',
      subInfo:'Les fonctions d’abonnement arrivent bientôt.\nRestez à l’écoute !',
      exportTitle:'📷 Exporter la recette', inclLoc:'📍 Inclure le lieu', inclDate:'📅 Inclure la date',
      inclCostPre:'💰 Inclure le coût du matériel (', inclCostPost:')', exportGo:'📸 Enregistrer dans la pellicule',
      saveTitle:'💾 Enregistrer la recette', recipeTitlePh:'Titre de la recette (ex. : Portrait)',
      overwriteWrap:(t)=>`Écraser « ${t} »`, currentRecipe:'Recette actuelle',
      overwriteBtn:'↩ Écraser', saveNewBtn:'✨ Enregistrer nouveau',
      bgSelectTitle:'Choisir le fond', bgNone:'Aucun', bgPaper:'Fond papier', bgTable:'Table', bgMountain:'Montagnes',
      colorSelect:'🎨 Choisir la couleur', subjectSelectTitle:'Choisir le sujet',
      cameraIconTitle:'Icône appareil', cameraPick:'📷 Choisir une photo d’appareil', cameraReset:'🔄 Revenir à l’icône',
      limitTitle:'📦 Limite de stockage atteinte',
      limitBody:'Les utilisateurs gratuits/invités peuvent enregistrer jusqu’à 30 recettes. Pour en enregistrer une nouvelle, supprimez-en une ancienne dans Ma page ou passez à l’abonnement.',
      limitDelete:'🗑 Supprimer dans Ma page', limitSub:'✨ Illimité avec l’abonnement',
      navRecipe:'Recette', navGear:'Matériel', navMypage:'Ma page',
    },
    it: {
      btnReset:'🔄 Nuovo', btnSave:'💾 Salva', sunToggle:'☀️ Sole', bgToggle:'🖼 Sfondo',
      memoCanvasPh:'📝 Inserisci nota', exportBtn:'↑ Esporta', flipBtn:'⇆ Capovolgi',
      resetConfirm:'Reimpostare foto, EXIF, luogo, nota, sfondo e disposizione luci?',
      replacePhotoConfirm:'Sostituire la foto?',
      replaceExifConfirm:'Sostituire anche gli EXIF (fotocamera, obiettivo, data, ecc.) con quelli della nuova foto?\n\nOK = sostituisci / Annulla = mantieni i dati di scatto attuali',
      subInfo:'Le funzioni in abbonamento arriveranno presto.\nResta sintonizzato!',
      exportTitle:'📷 Esporta ricetta', inclLoc:'📍 Includi luogo', inclDate:'📅 Includi data',
      inclCostPre:'💰 Includi costo attrezzatura (', inclCostPost:')', exportGo:'📸 Salva nel rullino',
      saveTitle:'💾 Salva ricetta', recipeTitlePh:'Titolo ricetta (es. Ritratto)',
      overwriteWrap:(t)=>`Sovrascrivi «${t}»`, currentRecipe:'Ricetta attuale',
      overwriteBtn:'↩ Sovrascrivi', saveNewBtn:'✨ Salva come nuovo',
      bgSelectTitle:'Seleziona sfondo', bgNone:'Nessuno', bgPaper:'Fondale di carta', bgTable:'Tavolo', bgMountain:'Montagne',
      colorSelect:'🎨 Seleziona colore', subjectSelectTitle:'Seleziona soggetto',
      cameraIconTitle:'Icona fotocamera', cameraPick:'📷 Scegli foto della fotocamera', cameraReset:'🔄 Torna all’icona',
      limitTitle:'📦 Limite di salvataggio raggiunto',
      limitBody:'Gli utenti gratuiti/ospiti possono salvare fino a 30 ricette. Per salvarne una nuova, elimina una vecchia ricetta in La mia pagina o passa all’abbonamento.',
      limitDelete:'🗑 Elimina in La mia pagina', limitSub:'✨ Illimitato con l’abbonamento',
      navRecipe:'Ricetta', navGear:'Attrezzatura', navMypage:'La mia pagina',
    },
    es: {
      btnReset:'🔄 Nuevo', btnSave:'💾 Guardar', sunToggle:'☀️ Sol', bgToggle:'🖼 Fondo',
      memoCanvasPh:'📝 Escribir nota', exportBtn:'↑ Exportar', flipBtn:'⇆ Voltear',
      resetConfirm:'¿Restablecer foto, EXIF, ubicación, nota, fondo y disposición de luces?',
      replacePhotoConfirm:'¿Reemplazar la foto?',
      replaceExifConfirm:'¿Reemplazar también los EXIF (cámara, objetivo, fecha, etc.) con los de la nueva foto?\n\nOK = reemplazar / Cancelar = conservar los datos de disparo actuales',
      subInfo:'Las funciones de suscripción llegarán pronto.\n¡Mantente atento!',
      exportTitle:'📷 Exportar receta', inclLoc:'📍 Incluir ubicación', inclDate:'📅 Incluir fecha',
      inclCostPre:'💰 Incluir coste del equipo (', inclCostPost:')', exportGo:'📸 Guardar en el carrete',
      saveTitle:'💾 Guardar receta', recipeTitlePh:'Título de la receta (p. ej. Retrato)',
      overwriteWrap:(t)=>`Sobrescribir «${t}»`, currentRecipe:'Receta actual',
      overwriteBtn:'↩ Sobrescribir', saveNewBtn:'✨ Guardar nuevo',
      bgSelectTitle:'Seleccionar fondo', bgNone:'Ninguno', bgPaper:'Fondo de papel', bgTable:'Mesa', bgMountain:'Montañas',
      colorSelect:'🎨 Seleccionar color', subjectSelectTitle:'Seleccionar sujeto',
      cameraIconTitle:'Icono de cámara', cameraPick:'📷 Elegir foto de tu cámara', cameraReset:'🔄 Volver al icono',
      limitTitle:'📦 Límite de guardado alcanzado',
      limitBody:'Los usuarios gratuitos/invitados pueden guardar hasta 30 recetas. Para guardar una nueva, elimina una receta antigua en Mi página o cambia a la suscripción.',
      limitDelete:'🗑 Eliminar en Mi página', limitSub:'✨ Ilimitado con suscripción',
      navRecipe:'Receta', navGear:'Equipo', navMypage:'Mi página',
    },
  };
  for (const k in EXTRA) { if (I18N[k]) Object.assign(I18N[k], EXTRA[k]); }

  // ── 追加辞書2（builder.html のハードコード文字列を回収）─────────────
  const EXTRA2 = {
    ja: {
      edit:'編集', del:'削除', catEdit:'✏️ 編集', catDel:'🗑 削除',
      priceSet:'価格を設定', pricePh:'例：45000', priceHint:'空欄のまま保存すると価格は未設定に戻ります',
      priceLabel:'価格（円・省略可）', catImgLabel:'カテゴリ画像', clearImg:'✕ 消す',
      emojiIconLabel:'絵文字アイコン（画像なしの場合に使用）', catEditTitle:'カテゴリを編集',
      catDeleteWarn:'このカテゴリと中の機材がすべて削除されます。', itemPhotoLabel:'機材写真（省略可）',
      pickPhoto:'📷 写真を選択', pickImage:'📷 画像を選択（省略可）', pickImageChange:'📷 画像を変更',
      photoTransparentHint:'※背景を透明化した正方形の写真（PNG）がおすすめです。サイズは自動で調整されます',
    },
    en: {
      edit:'Edit', del:'Delete', catEdit:'✏️ Edit', catDel:'🗑 Delete',
      priceSet:'Set price', pricePh:'e.g. 45000', priceHint:'Save blank to clear the price',
      priceLabel:'Price (¥, optional)', catImgLabel:'Category image', clearImg:'✕ Clear',
      emojiIconLabel:'Emoji icon (used when no image)', catEditTitle:'Edit category',
      catDeleteWarn:'This category and all its gear will be deleted.', itemPhotoLabel:'Gear photo (optional)',
      pickPhoto:'📷 Choose photo', pickImage:'📷 Choose image (optional)', pickImageChange:'📷 Change image',
      photoTransparentHint:'Tip: a square photo with a transparent background (PNG) works best. Size is adjusted automatically.',
    },
    zh: {
      edit:'编辑', del:'删除', catEdit:'✏️ 编辑', catDel:'🗑 删除',
      priceSet:'设置价格', pricePh:'例：45000', priceHint:'留空保存将清除价格',
      priceLabel:'价格（日元·可省略）', catImgLabel:'类别图片', clearImg:'✕ 清除',
      emojiIconLabel:'表情图标（无图片时使用）', catEditTitle:'编辑类别',
      catDeleteWarn:'该类别及其中的所有器材都将被删除。', itemPhotoLabel:'器材照片（可省略）',
      pickPhoto:'📷 选择照片', pickImage:'📷 选择图片（可省略）', pickImageChange:'📷 更换图片',
      photoTransparentHint:'※建议使用背景透明的正方形照片（PNG）。尺寸会自动调整',
    },
    ko: {
      edit:'편집', del:'삭제', catEdit:'✏️ 편집', catDel:'🗑 삭제',
      priceSet:'가격 설정', pricePh:'예: 45000', priceHint:'비워서 저장하면 가격이 해제됩니다',
      priceLabel:'가격 (엔·생략 가능)', catImgLabel:'카테고리 이미지', clearImg:'✕ 지우기',
      emojiIconLabel:'이모지 아이콘 (이미지 없을 때 사용)', catEditTitle:'카테고리 편집',
      catDeleteWarn:'이 카테고리와 안의 장비가 모두 삭제됩니다.', itemPhotoLabel:'장비 사진 (생략 가능)',
      pickPhoto:'📷 사진 선택', pickImage:'📷 이미지 선택 (생략 가능)', pickImageChange:'📷 이미지 변경',
      photoTransparentHint:'※배경을 투명하게 한 정사각형 사진(PNG)을 권장합니다. 크기는 자동으로 조정됩니다',
    },
    de: {
      edit:'Bearbeiten', del:'Löschen', catEdit:'✏️ Bearbeiten', catDel:'🗑 Löschen',
      priceSet:'Preis festlegen', pricePh:'z. B. 45000', priceHint:'Leer speichern setzt den Preis zurück',
      priceLabel:'Preis (¥, optional)', catImgLabel:'Kategoriebild', clearImg:'✕ Entfernen',
      emojiIconLabel:'Emoji-Symbol (falls kein Bild)', catEditTitle:'Kategorie bearbeiten',
      catDeleteWarn:'Diese Kategorie und ihr gesamtes Equipment werden gelöscht.', itemPhotoLabel:'Equipment-Foto (optional)',
      pickPhoto:'📷 Foto wählen', pickImage:'📷 Bild wählen (optional)', pickImageChange:'📷 Bild ändern',
      photoTransparentHint:'Tipp: Ein quadratisches Foto mit transparentem Hintergrund (PNG) ist ideal. Die Größe wird automatisch angepasst.',
    },
    fr: {
      edit:'Modifier', del:'Supprimer', catEdit:'✏️ Modifier', catDel:'🗑 Supprimer',
      priceSet:'Définir le prix', pricePh:'ex. : 45000', priceHint:'Enregistrer vide efface le prix',
      priceLabel:'Prix (¥, facultatif)', catImgLabel:'Image de catégorie', clearImg:'✕ Effacer',
      emojiIconLabel:'Icône emoji (si aucune image)', catEditTitle:'Modifier la catégorie',
      catDeleteWarn:'Cette catégorie et tout son matériel seront supprimés.', itemPhotoLabel:'Photo du matériel (facultatif)',
      pickPhoto:'📷 Choisir une photo', pickImage:'📷 Choisir une image (facultatif)', pickImageChange:'📷 Changer l’image',
      photoTransparentHint:'Astuce : une photo carrée à fond transparent (PNG) est idéale. La taille est ajustée automatiquement.',
    },
    it: {
      edit:'Modifica', del:'Elimina', catEdit:'✏️ Modifica', catDel:'🗑 Elimina',
      priceSet:'Imposta prezzo', pricePh:'es. 45000', priceHint:'Salva vuoto per azzerare il prezzo',
      priceLabel:'Prezzo (¥, facoltativo)', catImgLabel:'Immagine categoria', clearImg:'✕ Rimuovi',
      emojiIconLabel:'Icona emoji (se nessuna immagine)', catEditTitle:'Modifica categoria',
      catDeleteWarn:'Questa categoria e tutta la sua attrezzatura verranno eliminate.', itemPhotoLabel:'Foto attrezzatura (facoltativo)',
      pickPhoto:'📷 Scegli foto', pickImage:'📷 Scegli immagine (facoltativo)', pickImageChange:'📷 Cambia immagine',
      photoTransparentHint:'Suggerimento: una foto quadrata con sfondo trasparente (PNG) è ideale. Le dimensioni vengono regolate automaticamente.',
    },
    es: {
      edit:'Editar', del:'Eliminar', catEdit:'✏️ Editar', catDel:'🗑 Eliminar',
      priceSet:'Definir precio', pricePh:'p. ej. 45000', priceHint:'Guardar en blanco borra el precio',
      priceLabel:'Precio (¥, opcional)', catImgLabel:'Imagen de categoría', clearImg:'✕ Borrar',
      emojiIconLabel:'Icono emoji (si no hay imagen)', catEditTitle:'Editar categoría',
      catDeleteWarn:'Esta categoría y todo su equipo se eliminarán.', itemPhotoLabel:'Foto del equipo (opcional)',
      pickPhoto:'📷 Elegir foto', pickImage:'📷 Elegir imagen (opcional)', pickImageChange:'📷 Cambiar imagen',
      photoTransparentHint:'Consejo: una foto cuadrada con fondo transparente (PNG) funciona mejor. El tamaño se ajusta automáticamente.',
    },
  };
  for (const k in EXTRA2) { if (I18N[k]) Object.assign(I18N[k], EXTRA2[k]); }

  // ── 追加辞書3（通貨関連・priceLabel は通貨記号を含めない形に上書き）──
  const EXTRA3 = {
    ja: { priceLabel:'価格（省略可）', notSet:'💴未設定', pricePromptWrap:(n)=>`${n} の価格を入力してください` },
    en: { priceLabel:'Price (optional)', notSet:'💴 Not set', pricePromptWrap:(n)=>`Enter the price for ${n}` },
    zh: { priceLabel:'价格（可省略）', notSet:'💴未设定', pricePromptWrap:(n)=>`请输入 ${n} 的价格` },
    ko: { priceLabel:'가격 (생략 가능)', notSet:'💴미설정', pricePromptWrap:(n)=>`${n}의 가격을 입력하세요` },
    de: { priceLabel:'Preis (optional)', notSet:'💴 Nicht festgelegt', pricePromptWrap:(n)=>`Preis für ${n} eingeben` },
    fr: { priceLabel:'Prix (facultatif)', notSet:'💴 Non défini', pricePromptWrap:(n)=>`Saisir le prix de ${n}` },
    it: { priceLabel:'Prezzo (facoltativo)', notSet:'💴 Non impostato', pricePromptWrap:(n)=>`Inserisci il prezzo di ${n}` },
    es: { priceLabel:'Precio (opcional)', notSet:'💴 Sin definir', pricePromptWrap:(n)=>`Introduce el precio de ${n}` },
  };
  for (const k in EXTRA3) { if (I18N[k]) Object.assign(I18N[k], EXTRA3[k]); }

  // ── 追加辞書4（mypage.html）─────────────
  const EXTRA4 = {
    ja: {
      kmlExport:'🗺 KML出力', newCreate:'＋ 新規作成',
      limitBanner1:'⚠️ 保存上限：30件', limitBanner2:'（ゲスト・無料ユーザー）', limitBanner3:'サブスクリプションで無制限に保存できます。',
      limitBodyMypage:'ゲスト・無料ユーザーは最大30件まで保存できます。新しいレシピを保存するには、古いレシピを削除するか、サブスクリプションにアップグレードしてください。',
      limitDeleteOld:'🗑 古いレシピを削除する', confirmDeleteThis:'このレシピを削除しますか？',
      confirmDeleteWrap:(t)=>`「${t}」を削除しますか？`, thisRecipe:'このレシピ',
      noRecipesTitle:'保存されたレシピがありません', noRecipesHint:'レシピ画面で撮影情報を入力し、保存してください',
      newRecipeCreate:'＋ 新規レシピを作成', untitled:'無題のレシピ', lightsCountWrap:(n)=>`${n}灯`, noGearShort:'機材なし',
      searchPlaceholder:'🔍 タイトル・場所・日付', sortNewest:'📅 新しい順', sortOldest:'📅 古い順', noSearchResults:'該当するレシピがありません',
      loadFailed:'レシピの読み込みに失敗しました',
      kmlNoCoords:'ロケーション座標が登録されたレシピがありません。\n※現在はテキスト入力のみのため、将来のGoogle Places API対応後にKML出力が有効になります。',
      kmlDocName:'Lighting Recipe - 撮影ロケーション', kmlDocDesc:'Lighting Recipeから出力した撮影スポット一覧',
      kmlExportedWrap:(n)=>`✓ ${n}件を出力`,
    },
    en: {
      kmlExport:'🗺 KML export', newCreate:'＋ New',
      limitBanner1:'⚠️ Storage limit: 30', limitBanner2:'(guest/free users)', limitBanner3:'Save unlimited with a subscription.',
      limitBodyMypage:'Free/guest users can save up to 30 recipes. To save a new one, delete an old recipe or upgrade to a subscription.',
      limitDeleteOld:'🗑 Delete old recipes', confirmDeleteThis:'Delete this recipe?',
      confirmDeleteWrap:(t)=>`Delete "${t}"?`, thisRecipe:'this recipe',
      noRecipesTitle:'No saved recipes', noRecipesHint:'Enter shooting info on the Recipe screen and save.',
      newRecipeCreate:'＋ Create new recipe', untitled:'Untitled recipe', lightsCountWrap:(n)=>`${n} lights`, noGearShort:'No gear',
      searchPlaceholder:'🔍 Title, place, date', sortNewest:'📅 Newest', sortOldest:'📅 Oldest', noSearchResults:'No matching recipes',
      loadFailed:'Failed to load recipes',
      kmlNoCoords:'No recipes have location coordinates.\nNote: only text input is available now; KML export will work after Google Places API support is added.',
      kmlDocName:'Lighting Recipe - Shooting Locations', kmlDocDesc:'List of shooting spots exported from Lighting Recipe',
      kmlExportedWrap:(n)=>`✓ ${n} exported`,
    },
    zh: {
      kmlExport:'🗺 导出KML', newCreate:'＋ 新建',
      limitBanner1:'⚠️ 保存上限：30个', limitBanner2:'（访客·免费用户）', limitBanner3:'订阅后可无限保存。',
      limitBodyMypage:'访客·免费用户最多可保存30个配方。若要保存新配方，请删除旧配方或升级订阅。',
      limitDeleteOld:'🗑 删除旧配方', confirmDeleteThis:'删除这个配方吗？',
      confirmDeleteWrap:(t)=>`删除「${t}」吗？`, thisRecipe:'这个配方',
      noRecipesTitle:'没有已保存的配方', noRecipesHint:'请在配方页面输入拍摄信息并保存。',
      newRecipeCreate:'＋ 新建配方', untitled:'无标题配方', lightsCountWrap:(n)=>`${n}灯`, noGearShort:'无器材',
      searchPlaceholder:'🔍 标题、地点、日期', sortNewest:'📅 最新', sortOldest:'📅 最早', noSearchResults:'没有匹配的配方',
      loadFailed:'加载配方失败',
      kmlNoCoords:'没有已登记位置坐标的配方。\n※目前仅支持文本输入，将来支持 Google Places API 后 KML 导出才会生效。',
      kmlDocName:'Lighting Recipe - 拍摄地点', kmlDocDesc:'从 Lighting Recipe 导出的拍摄点列表',
      kmlExportedWrap:(n)=>`✓ 已导出 ${n} 个`,
    },
    ko: {
      kmlExport:'🗺 KML 내보내기', newCreate:'＋ 새로 만들기',
      limitBanner1:'⚠️ 저장 한도: 30개', limitBanner2:'(게스트·무료 사용자)', limitBanner3:'구독하면 무제한으로 저장할 수 있습니다.',
      limitBodyMypage:'게스트·무료 사용자는 최대 30개까지 저장할 수 있습니다. 새 레시피를 저장하려면 오래된 레시피를 삭제하거나 구독으로 업그레이드하세요.',
      limitDeleteOld:'🗑 오래된 레시피 삭제', confirmDeleteThis:'이 레시피를 삭제하시겠습니까?',
      confirmDeleteWrap:(t)=>`「${t}」을(를) 삭제하시겠습니까?`, thisRecipe:'이 레시피',
      noRecipesTitle:'저장된 레시피가 없습니다', noRecipesHint:'레시피 화면에서 촬영 정보를 입력하고 저장하세요.',
      newRecipeCreate:'＋ 새 레시피 만들기', untitled:'제목 없는 레시피', lightsCountWrap:(n)=>`조명 ${n}개`, noGearShort:'장비 없음',
      searchPlaceholder:'🔍 제목·장소·날짜', sortNewest:'📅 최신순', sortOldest:'📅 오래된순', noSearchResults:'일치하는 레시피가 없습니다',
      loadFailed:'레시피를 불러오지 못했습니다',
      kmlNoCoords:'위치 좌표가 등록된 레시피가 없습니다.\n※현재는 텍스트 입력만 가능하며, 향후 Google Places API 지원 후 KML 내보내기가 활성화됩니다.',
      kmlDocName:'Lighting Recipe - 촬영 장소', kmlDocDesc:'Lighting Recipe에서 내보낸 촬영 스팟 목록',
      kmlExportedWrap:(n)=>`✓ ${n}개 내보냄`,
    },
    de: {
      kmlExport:'🗺 KML-Export', newCreate:'＋ Neu',
      limitBanner1:'⚠️ Speicherlimit: 30', limitBanner2:'(Gäste/Gratis-Nutzer)', limitBanner3:'Mit einem Abo unbegrenzt speichern.',
      limitBodyMypage:'Gäste/Gratis-Nutzer können bis zu 30 Rezepte speichern. Um ein neues zu speichern, lösche ein altes Rezept oder wechsle zum Abo.',
      limitDeleteOld:'🗑 Alte Rezepte löschen', confirmDeleteThis:'Dieses Rezept löschen?',
      confirmDeleteWrap:(t)=>`„${t}“ löschen?`, thisRecipe:'dieses Rezept',
      noRecipesTitle:'Keine gespeicherten Rezepte', noRecipesHint:'Gib auf dem Rezept-Bildschirm die Aufnahmedaten ein und speichere.',
      newRecipeCreate:'＋ Neues Rezept erstellen', untitled:'Unbenanntes Rezept', lightsCountWrap:(n)=>`${n} Lichter`, noGearShort:'Kein Equipment',
      searchPlaceholder:'🔍 Titel, Ort, Datum', sortNewest:'📅 Neueste', sortOldest:'📅 Älteste', noSearchResults:'Keine passenden Rezepte',
      loadFailed:'Rezepte konnten nicht geladen werden',
      kmlNoCoords:'Keine Rezepte mit Ortskoordinaten.\nHinweis: Derzeit nur Texteingabe; KML-Export ist nach Unterstützung der Google-Places-API verfügbar.',
      kmlDocName:'Lighting Recipe - Aufnahmeorte', kmlDocDesc:'Aus Lighting Recipe exportierte Liste der Aufnahmeorte',
      kmlExportedWrap:(n)=>`✓ ${n} exportiert`,
    },
    fr: {
      kmlExport:'🗺 Export KML', newCreate:'＋ Nouveau',
      limitBanner1:'⚠️ Limite de stockage : 30', limitBanner2:'(utilisateurs gratuits/invités)', limitBanner3:'Enregistrez sans limite avec un abonnement.',
      limitBodyMypage:'Les utilisateurs gratuits/invités peuvent enregistrer jusqu’à 30 recettes. Pour en enregistrer une nouvelle, supprimez-en une ancienne ou passez à l’abonnement.',
      limitDeleteOld:'🗑 Supprimer d’anciennes recettes', confirmDeleteThis:'Supprimer cette recette ?',
      confirmDeleteWrap:(t)=>`Supprimer « ${t} » ?`, thisRecipe:'cette recette',
      noRecipesTitle:'Aucune recette enregistrée', noRecipesHint:'Saisissez les infos de prise de vue sur l’écran Recette et enregistrez.',
      newRecipeCreate:'＋ Créer une recette', untitled:'Recette sans titre', lightsCountWrap:(n)=>`${n} lumières`, noGearShort:'Aucun matériel',
      searchPlaceholder:'🔍 Titre, lieu, date', sortNewest:'📅 Récent', sortOldest:'📅 Ancien', noSearchResults:'Aucune recette correspondante',
      loadFailed:'Échec du chargement des recettes',
      kmlNoCoords:'Aucune recette avec des coordonnées de lieu.\nRemarque : seule la saisie de texte est disponible ; l’export KML fonctionnera après la prise en charge de l’API Google Places.',
      kmlDocName:'Lighting Recipe - Lieux de prise de vue', kmlDocDesc:'Liste des lieux de prise de vue exportée depuis Lighting Recipe',
      kmlExportedWrap:(n)=>`✓ ${n} exportées`,
    },
    it: {
      kmlExport:'🗺 Esporta KML', newCreate:'＋ Nuovo',
      limitBanner1:'⚠️ Limite di salvataggio: 30', limitBanner2:'(utenti gratuiti/ospiti)', limitBanner3:'Salva senza limiti con un abbonamento.',
      limitBodyMypage:'Gli utenti gratuiti/ospiti possono salvare fino a 30 ricette. Per salvarne una nuova, elimina una vecchia ricetta o passa all’abbonamento.',
      limitDeleteOld:'🗑 Elimina vecchie ricette', confirmDeleteThis:'Eliminare questa ricetta?',
      confirmDeleteWrap:(t)=>`Eliminare «${t}»?`, thisRecipe:'questa ricetta',
      noRecipesTitle:'Nessuna ricetta salvata', noRecipesHint:'Inserisci le info di scatto nella schermata Ricetta e salva.',
      newRecipeCreate:'＋ Crea una ricetta', untitled:'Ricetta senza titolo', lightsCountWrap:(n)=>`${n} luci`, noGearShort:'Nessuna attrezzatura',
      searchPlaceholder:'🔍 Titolo, luogo, data', sortNewest:'📅 Recenti', sortOldest:'📅 Vecchi', noSearchResults:'Nessuna ricetta corrispondente',
      loadFailed:'Impossibile caricare le ricette',
      kmlNoCoords:'Nessuna ricetta con coordinate di luogo.\nNota: al momento è disponibile solo l’inserimento di testo; l’esportazione KML funzionerà dopo il supporto dell’API Google Places.',
      kmlDocName:'Lighting Recipe - Luoghi di scatto', kmlDocDesc:'Elenco dei luoghi di scatto esportato da Lighting Recipe',
      kmlExportedWrap:(n)=>`✓ ${n} esportate`,
    },
    es: {
      kmlExport:'🗺 Exportar KML', newCreate:'＋ Nuevo',
      limitBanner1:'⚠️ Límite de guardado: 30', limitBanner2:'(usuarios gratuitos/invitados)', limitBanner3:'Guarda sin límite con una suscripción.',
      limitBodyMypage:'Los usuarios gratuitos/invitados pueden guardar hasta 30 recetas. Para guardar una nueva, elimina una receta antigua o cambia a la suscripción.',
      limitDeleteOld:'🗑 Eliminar recetas antiguas', confirmDeleteThis:'¿Eliminar esta receta?',
      confirmDeleteWrap:(t)=>`¿Eliminar «${t}»?`, thisRecipe:'esta receta',
      noRecipesTitle:'No hay recetas guardadas', noRecipesHint:'Introduce la información de rodaje en la pantalla Receta y guarda.',
      newRecipeCreate:'＋ Crear receta', untitled:'Receta sin título', lightsCountWrap:(n)=>`${n} luces`, noGearShort:'Sin equipo',
      searchPlaceholder:'🔍 Título, lugar, fecha', sortNewest:'📅 Recientes', sortOldest:'📅 Antiguos', noSearchResults:'No hay recetas coincidentes',
      loadFailed:'No se pudieron cargar las recetas',
      kmlNoCoords:'No hay recetas con coordenadas de ubicación.\nNota: por ahora solo hay entrada de texto; la exportación KML funcionará tras el soporte de la API de Google Places.',
      kmlDocName:'Lighting Recipe - Lugares de rodaje', kmlDocDesc:'Lista de lugares de rodaje exportada desde Lighting Recipe',
      kmlExportedWrap:(n)=>`✓ ${n} exportadas`,
    },
  };
  for (const k in EXTRA4) { if (I18N[k]) Object.assign(I18N[k], EXTRA4[k]); }

  // ── 追加辞書5（設定欄ラベル）─────────────
  const EXTRA5 = {
    ja: { settingsTitle:'⚙️ 設定', langLabel:'言語', currencyLabel:'通貨', privacyPolicy:'プライバシーポリシー' },
    en: { settingsTitle:'⚙️ Settings', langLabel:'Language', currencyLabel:'Currency', privacyPolicy:'Privacy Policy' },
    zh: { settingsTitle:'⚙️ 设置', langLabel:'语言', currencyLabel:'货币', privacyPolicy:'隐私政策' },
    ko: { settingsTitle:'⚙️ 설정', langLabel:'언어', currencyLabel:'통화', privacyPolicy:'개인정보 처리방침' },
    de: { settingsTitle:'⚙️ Einstellungen', langLabel:'Sprache', currencyLabel:'Währung', privacyPolicy:'Datenschutz' },
    fr: { settingsTitle:'⚙️ Paramètres', langLabel:'Langue', currencyLabel:'Devise', privacyPolicy:'Politique de confidentialité' },
    it: { settingsTitle:'⚙️ Impostazioni', langLabel:'Lingua', currencyLabel:'Valuta', privacyPolicy:'Informativa sulla privacy' },
    es: { settingsTitle:'⚙️ Ajustes', langLabel:'Idioma', currencyLabel:'Moneda', privacyPolicy:'Política de privacidad' },
  };
  for (const k in EXTRA5) { if (I18N[k]) Object.assign(I18N[k], EXTRA5[k]); }

  // ── 追加辞書6（機材倉庫の資産合計）─────────────
  const EXTRA6 = {
    ja: { vaultTotalLabel:'資産合計', vaultCountWrap:(n)=>`${n}点` },
    en: { vaultTotalLabel:'Total value', vaultCountWrap:(n)=>`${n} item${n===1?'':'s'}` },
    zh: { vaultTotalLabel:'资产合计', vaultCountWrap:(n)=>`${n}件` },
    ko: { vaultTotalLabel:'자산 합계', vaultCountWrap:(n)=>`${n}점` },
    de: { vaultTotalLabel:'Gesamtwert', vaultCountWrap:(n)=>`${n} Artikel` },
    fr: { vaultTotalLabel:'Valeur totale', vaultCountWrap:(n)=>`${n} article${n===1?'':'s'}` },
    it: { vaultTotalLabel:'Valore totale', vaultCountWrap:(n)=>`${n} articol${n===1?'o':'i'}` },
    es: { vaultTotalLabel:'Valor total', vaultCountWrap:(n)=>`${n} artículo${n===1?'':'s'}` },
  };
  for (const k in EXTRA6) { if (I18N[k]) Object.assign(I18N[k], EXTRA6[k]); }

  // ── 追加辞書11（機材合計 / カメラ・レンズ資産合計 / 防湿庫の並べ替え / 使い方）──
  const EXTRA11 = {
    ja: { equipTotalLabel:'機材合計', cabinetAssetLabel:'カメラ・レンズ資産合計', gearManualBtn:'使い方', sortAdded:'追加順', sortPrice:'金額', sortMaker:'メーカー', directCatsHeading:'撮影小物（ライティング図に直接配置されます）' },
    en: { equipTotalLabel:'Gear total', cabinetAssetLabel:'Camera & lens value', gearManualBtn:'Help', sortAdded:'Added', sortPrice:'Price', sortMaker:'Brand', directCatsHeading:'Props (placed directly on the diagram)' },
    zh: { equipTotalLabel:'器材合计', cabinetAssetLabel:'相机镜头资产合计', gearManualBtn:'使用说明', sortAdded:'添加顺序', sortPrice:'价格', sortMaker:'品牌', directCatsHeading:'拍摄小物（直接放置到布光图）' },
    ko: { equipTotalLabel:'장비 합계', cabinetAssetLabel:'카메라·렌즈 자산 합계', gearManualBtn:'사용법', sortAdded:'추가순', sortPrice:'가격', sortMaker:'브랜드', directCatsHeading:'촬영 소품 (조명도에 직접 배치)' },
    de: { equipTotalLabel:'Ausrüstung gesamt', cabinetAssetLabel:'Kamera- & Objektivwert', gearManualBtn:'Hilfe', sortAdded:'Zuletzt', sortPrice:'Preis', sortMaker:'Marke', directCatsHeading:'Zubehör (direkt im Diagramm platziert)' },
    fr: { equipTotalLabel:'Total équipement', cabinetAssetLabel:'Valeur boîtiers & objectifs', gearManualBtn:'Aide', sortAdded:'Ajout', sortPrice:'Prix', sortMaker:'Marque', directCatsHeading:'Accessoires (placés sur le schéma)' },
    it: { equipTotalLabel:'Totale attrezzatura', cabinetAssetLabel:'Valore corpi e obiettivi', gearManualBtn:'Guida', sortAdded:'Aggiunta', sortPrice:'Prezzo', sortMaker:'Marca', directCatsHeading:'Accessori (posti sullo schema)' },
    es: { equipTotalLabel:'Total de equipo', cabinetAssetLabel:'Valor cámaras y objetivos', gearManualBtn:'Ayuda', sortAdded:'Añadido', sortPrice:'Precio', sortMaker:'Marca', directCatsHeading:'Accesorios (colocados en el esquema)' },
  };
  for (const k in EXTRA11) { if (I18N[k]) Object.assign(I18N[k], EXTRA11[k]); }

  // ── 追加辞書12（初回ヒント / 防湿庫の空状態案内）──
  const EXTRA12 = {
    ja: { firstHintTitle:'かんたん3ステップ', firstHintBody:'① 写真を選ぶ（EXIF自動読取）\n② ライトを配置して図を作る\n③「↑ 出力」で画像を保存・共有', firstHintBtn:'はじめる', cabinetEmptyHint:'＋ からカメラ・レンズを登録すると、資産をまとめて管理できます' },
    en: { firstHintTitle:'Get started in 3 steps', firstHintBody:'1. Pick a photo (EXIF auto-read)\n2. Place lights to build the diagram\n3. Tap "↑ Export" to save & share', firstHintBtn:'Start', cabinetEmptyHint:'Tap ＋ to add cameras & lenses and track their value' },
    zh: { firstHintTitle:'快速三步上手', firstHintBody:'① 选择照片（自动读取EXIF）\n② 布置灯光生成示意图\n③ 点「↑ 输出」保存并分享', firstHintBtn:'开始', cabinetEmptyHint:'点 ＋ 添加相机和镜头，统一管理资产' },
    ko: { firstHintTitle:'3단계로 시작', firstHintBody:'① 사진 선택 (EXIF 자동 인식)\n② 조명을 배치해 도면 작성\n③ \'↑ 내보내기\'로 저장·공유', firstHintBtn:'시작', cabinetEmptyHint:'＋ 로 카메라·렌즈를 등록하면 자산을 관리할 수 있어요' },
    de: { firstHintTitle:'In 3 Schritten starten', firstHintBody:'1. Foto wählen (EXIF automatisch)\n2. Lichter platzieren & Diagramm bauen\n3. „↑ Export" zum Speichern & Teilen', firstHintBtn:'Los geht\'s', cabinetEmptyHint:'Mit ＋ Kameras & Objektive erfassen und Wert verwalten' },
    fr: { firstHintTitle:'Démarrer en 3 étapes', firstHintBody:'1. Choisir une photo (EXIF auto)\n2. Placer les lumières pour le schéma\n3. « ↑ Exporter » pour enregistrer & partager', firstHintBtn:'Commencer', cabinetEmptyHint:'Touchez ＋ pour ajouter boîtiers & objectifs et suivre leur valeur' },
    it: { firstHintTitle:'Inizia in 3 passi', firstHintBody:'1. Scegli una foto (EXIF automatico)\n2. Posiziona le luci e crea lo schema\n3. "↑ Esporta" per salvare e condividere', firstHintBtn:'Inizia', cabinetEmptyHint:'Tocca ＋ per aggiungere corpi e obiettivi e gestirne il valore' },
    es: { firstHintTitle:'Empieza en 3 pasos', firstHintBody:'1. Elige una foto (EXIF automático)\n2. Coloca las luces y crea el esquema\n3. "↑ Exportar" para guardar y compartir', firstHintBtn:'Empezar', cabinetEmptyHint:'Toca ＋ para añadir cámaras y objetivos y gestionar su valor' },
  };
  for (const k in EXTRA12) { if (I18N[k]) Object.assign(I18N[k], EXTRA12[k]); }

  // ── 追加辞書13（出力: EXIF情報トグル）──
  const EXTRA13 = {
    ja: { inclExif:'📷 EXIF情報を含める' },
    en: { inclExif:'📷 Include EXIF info' },
    zh: { inclExif:'📷 包含EXIF信息' },
    ko: { inclExif:'📷 EXIF 정보 포함' },
    de: { inclExif:'📷 EXIF-Daten einschließen' },
    fr: { inclExif:'📷 Inclure les EXIF' },
    it: { inclExif:'📷 Includi info EXIF' },
    es: { inclExif:'📷 Incluir EXIF' },
  };
  for (const k in EXTRA13) { if (I18N[k]) Object.assign(I18N[k], EXTRA13[k]); }

  // ── 追加辞書14（法的表示: Amazonアソシエイト開示・商標帰属）──
  const EXTRA14 = {
    ja: { amazonDisclosure:'Amazonのアソシエイトとして、Lighting Recipe は適格販売により収入を得ています。', trademarkNotice:'記載の製品名・会社名は各社の商標または登録商標です。本アプリは各メーカーと提携・推奨関係にありません。' },
    en: { amazonDisclosure:'As an Amazon Associate, Lighting Recipe earns from qualifying purchases.', trademarkNotice:'Product and company names mentioned are trademarks of their respective owners. This app is not affiliated with or endorsed by them.' },
    zh: { amazonDisclosure:'作为亚马逊联盟成员，Lighting Recipe 从符合条件的购买中获得收入。', trademarkNotice:'文中提及的产品和公司名称为各自所有者的商标。本应用与各厂商无隶属或认可关系。' },
    ko: { amazonDisclosure:'Amazon 어소시에이트로서 Lighting Recipe는 적격 구매를 통해 수익을 얻습니다.', trademarkNotice:'언급된 제품명·회사명은 각 소유자의 상표입니다. 본 앱은 각 제조사와 제휴하거나 승인받지 않았습니다.' },
    de: { amazonDisclosure:'Als Amazon-Partner verdient Lighting Recipe an qualifizierten Käufen.', trademarkNotice:'Genannte Produkt- und Firmennamen sind Marken der jeweiligen Inhaber. Diese App steht in keiner Verbindung zu ihnen.' },
    fr: { amazonDisclosure:'En tant que Partenaire Amazon, Lighting Recipe réalise un bénéfice sur les achats remplissant les conditions requises.', trademarkNotice:'Les noms de produits et de sociétés cités sont des marques de leurs détenteurs respectifs. Cette app n\'est ni affiliée ni approuvée par eux.' },
    it: { amazonDisclosure:'In qualità di Affiliato Amazon, Lighting Recipe riceve un guadagno dagli acquisti idonei.', trademarkNotice:'I nomi di prodotti e aziende citati sono marchi dei rispettivi proprietari. Questa app non è affiliata né approvata da essi.' },
    es: { amazonDisclosure:'Como Asociado de Amazon, Lighting Recipe obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables.', trademarkNotice:'Los nombres de productos y empresas mencionados son marcas de sus respectivos propietarios. Esta app no está afiliada ni respaldada por ellos.' },
  };
  for (const k in EXTRA14) { if (I18N[k]) Object.assign(I18N[k], EXTRA14[k]); }

  // ── 追加辞書15（機材倉庫の「使い方」モーダル本文）──
  //   従来はbuilder.htmlに日本語ベタ書きで、日本語以外の7言語でも日本語のまま出ていた。
  //   applyDataI18nはtextContent置換のため、<b>見出し</b><br>本文 を見出し/本文の別キーに分割している。
  const EXTRA15 = {
    ja: {
      gearManualTitle:'機材倉庫の使い方',
      gmAddHead:'📦 機材を追加',
      gmAddBody:'各カテゴリの枠をタップ →「＋追加」でメーカー・型番・価格・写真を登録。メーカー名と型番は候補から選べます（自由入力も可）。',
      gmLightHead:'💡 光源スイッチ',
      gmLightBody:'ライト機材の自作カテゴリでは「光源として扱う」のON/OFFで、ライトか小物（モディファイア）かを切り替えられます。※撮影小物のカテゴリは常に非光源です。',
      gmBuilderHead:'🔦 ライトビルダー',
      gmBuilderBody:'ライトを選んで配置・出力・色を設定。「↺ 一括リセット」で全ライトを消灯します。',
      gmMysetHead:'📌 マイセット',
      gmMysetBody:'各機材の 📌 ボタンから、よく使うライトの組み合わせを保存して、ワンタップで呼び出せます。',
      gmTotalHead:'💰 合計表示',
      gmTotalBody:'機材合計＝倉庫の機材のみ／資産合計＝それに防湿庫のカメラ・レンズを加えた総額（いずれも価格を入力した機材のみ集計）。',
    },
    en: {
      gearManualTitle:'Using the gear vault',
      gmAddHead:'📦 Adding gear',
      gmAddBody:'Tap a category tile, then "+ Add" to register brand, model, price and a photo. Brand and model can be picked from the suggestions or typed freely.',
      gmLightHead:'💡 Light source switch',
      gmLightBody:'In your own lighting categories, "Treat as light source" switches an item between a light and a modifier. Prop categories are always non-light.',
      gmBuilderHead:'🔦 Light builder',
      gmBuilderBody:'Select a light to set its position, output and color. "↺ Reset all" turns every light off.',
      gmMysetHead:'📌 My Sets',
      gmMysetBody:'Use the 📌 button on any item to save a favorite combination of lights and recall it with a single tap.',
      gmTotalHead:'💰 Totals',
      gmTotalBody:'Gear total = vault items only. Total value = that plus the cameras and lenses in the dry cabinet. Both count only items that have a price.',
    },
    zh: {
      gearManualTitle:'器材库使用说明',
      gmAddHead:'📦 添加器材',
      gmAddBody:'点击各分类方块 →「＋添加」即可登记品牌、型号、价格和照片。品牌与型号可从候选中选择，也可自由输入。',
      gmLightHead:'💡 光源开关',
      gmLightBody:'在自建的灯光器材分类中，可用「作为光源」的开关切换该器材是灯具还是配件（控光附件）。拍摄小物分类始终为非光源。',
      gmBuilderHead:'🔦 布光构建器',
      gmBuilderBody:'选择灯具后可设置位置、输出和颜色。点击「↺ 全部重置」可关闭所有灯具。',
      gmMysetHead:'📌 我的套装',
      gmMysetBody:'通过各器材的 📌 按钮，可保存常用的灯光组合，一键调用。',
      gmTotalHead:'💰 合计显示',
      gmTotalBody:'器材合计＝仅器材库中的器材；资产合计＝再加上防潮箱中的相机和镜头的总额（两者均只统计已输入价格的器材）。',
    },
    ko: {
      gearManualTitle:'장비 창고 사용법',
      gmAddHead:'📦 장비 추가',
      gmAddBody:'각 카테고리 칸을 탭한 뒤 「＋추가」로 브랜드·모델명·가격·사진을 등록합니다. 브랜드와 모델명은 추천 목록에서 고르거나 직접 입력할 수 있습니다.',
      gmLightHead:'💡 광원 스위치',
      gmLightBody:'직접 만든 조명 장비 카테고리에서는 「광원으로 사용」 ON/OFF로 조명인지 소품(모디파이어)인지 전환할 수 있습니다. 촬영 소품 카테고리는 항상 비광원입니다.',
      gmBuilderHead:'🔦 라이트 빌더',
      gmBuilderBody:'조명을 선택해 위치·출력·색을 설정합니다. 「↺ 전체 초기화」로 모든 조명을 끕니다.',
      gmMysetHead:'📌 마이 세트',
      gmMysetBody:'각 장비의 📌 버튼으로 자주 쓰는 조명 조합을 저장해 두고 한 번의 탭으로 불러올 수 있습니다.',
      gmTotalHead:'💰 합계 표시',
      gmTotalBody:'장비 합계＝창고의 장비만, 자산 합계＝거기에 제습함의 카메라·렌즈를 더한 총액입니다(둘 다 가격을 입력한 장비만 집계).',
    },
    de: {
      gearManualTitle:'Ausrüstungslager verwenden',
      gmAddHead:'📦 Ausrüstung hinzufügen',
      gmAddBody:'Auf eine Kategorie tippen, dann über „+ Hinzufügen“ Marke, Modell, Preis und Foto erfassen. Marke und Modell lassen sich aus den Vorschlägen wählen oder frei eingeben.',
      gmLightHead:'💡 Lichtquellen-Schalter',
      gmLightBody:'In eigenen Leuchten-Kategorien legt „Als Lichtquelle behandeln“ fest, ob ein Teil eine Leuchte oder ein Lichtformer ist. Zubehör-Kategorien sind nie eine Lichtquelle.',
      gmBuilderHead:'🔦 Licht-Builder',
      gmBuilderBody:'Eine Leuchte auswählen und Position, Leistung und Farbe einstellen. „↺ Alles zurücksetzen“ schaltet alle Leuchten aus.',
      gmMysetHead:'📌 Meine Sets',
      gmMysetBody:'Über die Schaltfläche 📌 an jedem Teil lassen sich häufig genutzte Licht-Kombinationen speichern und mit einem Tipp abrufen.',
      gmTotalHead:'💰 Summen',
      gmTotalBody:'Ausrüstung gesamt = nur Teile im Lager. Gesamtwert = zusätzlich Kameras und Objektive aus dem Trockenschrank. Gezählt wird jeweils nur, was einen Preis hat.',
    },
    fr: {
      gearManualTitle:'Utiliser la réserve de matériel',
      gmAddHead:'📦 Ajouter du matériel',
      gmAddBody:'Touchez une catégorie, puis « + Ajouter » pour enregistrer la marque, le modèle, le prix et une photo. La marque et le modèle peuvent être choisis dans les suggestions ou saisis librement.',
      gmLightHead:'💡 Interrupteur source lumineuse',
      gmLightBody:'Dans vos propres catégories d\'éclairage, « Traiter comme source lumineuse » indique si l\'élément est une lampe ou un modeleur. Les catégories d\'accessoires ne sont jamais des sources.',
      gmBuilderHead:'🔦 Constructeur d\'éclairage',
      gmBuilderBody:'Sélectionnez une lampe pour régler sa position, sa puissance et sa couleur. « ↺ Tout réinitialiser » éteint toutes les lampes.',
      gmMysetHead:'📌 Mes ensembles',
      gmMysetBody:'Le bouton 📌 de chaque élément permet d\'enregistrer vos combinaisons de lumières favorites et de les rappeler d\'un seul geste.',
      gmTotalHead:'💰 Totaux',
      gmTotalBody:'Total équipement = uniquement la réserve. Valeur totale = en y ajoutant les boîtiers et objectifs de l\'armoire sèche. Seuls les éléments ayant un prix sont comptés.',
    },
    it: {
      gearManualTitle:'Usare il magazzino attrezzatura',
      gmAddHead:'📦 Aggiungere attrezzatura',
      gmAddBody:'Tocca una categoria, poi «+ Aggiungi» per registrare marca, modello, prezzo e foto. Marca e modello si possono scegliere tra i suggerimenti o digitare liberamente.',
      gmLightHead:'💡 Interruttore sorgente luminosa',
      gmLightBody:'Nelle categorie di illuminazione create da te, «Tratta come sorgente luminosa» stabilisce se l\'elemento è una luce o un modificatore. Le categorie di accessori non sono mai sorgenti.',
      gmBuilderHead:'🔦 Light builder',
      gmBuilderBody:'Seleziona una luce per impostarne posizione, potenza e colore. «↺ Azzera tutto» spegne tutte le luci.',
      gmMysetHead:'📌 I miei set',
      gmMysetBody:'Con il pulsante 📌 di ogni elemento puoi salvare le combinazioni di luci che usi più spesso e richiamarle con un tocco.',
      gmTotalHead:'💰 Totali',
      gmTotalBody:'Totale attrezzatura = solo il magazzino. Valore totale = più le fotocamere e gli obiettivi della vetrinetta. Si contano solo gli elementi con un prezzo.',
    },
    es: {
      gearManualTitle:'Usar el almacén de equipo',
      gmAddHead:'📦 Añadir equipo',
      gmAddBody:'Toca una categoría y luego «+ Añadir» para registrar marca, modelo, precio y foto. La marca y el modelo se pueden elegir entre las sugerencias o escribir libremente.',
      gmLightHead:'💡 Interruptor de fuente de luz',
      gmLightBody:'En tus propias categorías de iluminación, «Tratar como fuente de luz» define si el elemento es una luz o un modificador. Las categorías de accesorios nunca son fuentes de luz.',
      gmBuilderHead:'🔦 Constructor de luz',
      gmBuilderBody:'Selecciona una luz para ajustar su posición, potencia y color. «↺ Restablecer todo» apaga todas las luces.',
      gmMysetHead:'📌 Mis conjuntos',
      gmMysetBody:'Con el botón 📌 de cada elemento puedes guardar tus combinaciones de luces habituales y recuperarlas con un toque.',
      gmTotalHead:'💰 Totales',
      gmTotalBody:'Total de equipo = solo el almacén. Valor total = añadiendo las cámaras y objetivos del armario seco. Solo se cuentan los elementos que tienen precio.',
    },
  };
  for (const k in EXTRA15) { if (I18N[k]) Object.assign(I18N[k], EXTRA15[k]); }

  // ── 追加辞書16（防湿庫の枠上限：無料枠が埋まったときのロック表示）──
  //   maxは「サブスクで拡張される枠数」。数字は呼び出し側（cabinet.html）から渡す。
  const EXTRA16 = {
    ja: { cabinetLockName:(max)=>`サブスクで${max}枠に拡張` },
    en: { cabinetLockName:(max)=>`Subscribe for up to ${max}` },
    zh: { cabinetLockName:(max)=>`订阅可扩展至${max}格` },
    ko: { cabinetLockName:(max)=>`구독 시 최대 ${max}칸` },
    de: { cabinetLockName:(max)=>`Mit Abo bis zu ${max} Plätze` },
    fr: { cabinetLockName:(max)=>`Jusqu'à ${max} avec l'abo` },
    it: { cabinetLockName:(max)=>`Fino a ${max} con l'abbonamento` },
    es: { cabinetLockName:(max)=>`Hasta ${max} con la suscripción` },
  };
  for (const k in EXTRA16) { if (I18N[k]) Object.assign(I18N[k], EXTRA16[k]); }

  // ── 追加辞書17（防湿庫：シリアルナンバー欄＋任意ラベル）──
  //   optionalSuffix はラベル末尾に付ける「（任意）」表記。必須は型番のみ。
  const EXTRA17 = {
    ja: { cabinetSerial:'シリアルナンバー', optionalSuffix:'（任意）' },
    en: { cabinetSerial:'Serial number', optionalSuffix:' (optional)' },
    zh: { cabinetSerial:'序列号', optionalSuffix:'（选填）' },
    ko: { cabinetSerial:'시리얼 번호', optionalSuffix:' (선택)' },
    de: { cabinetSerial:'Seriennummer', optionalSuffix:' (optional)' },
    fr: { cabinetSerial:'Numéro de série', optionalSuffix:' (facultatif)' },
    it: { cabinetSerial:'Numero di serie', optionalSuffix:' (facoltativo)' },
    es: { cabinetSerial:'Número de serie', optionalSuffix:' (opcional)' },
  };
  for (const k in EXTRA17) { if (I18N[k]) Object.assign(I18N[k], EXTRA17[k]); }

  // ── 追加辞書18（素の「価格」ラベル）──
  //   priceSet='価格を設定'（ダイアログタイトル兼用）・priceLabel='価格（省略可）'は
  //   どちらも（任意）サフィックスと組み合わせると不自然なため、修飾なしの単語を用意。
  const EXTRA18 = {
    ja: { pricePlain:'価格' },
    en: { pricePlain:'Price' },
    zh: { pricePlain:'价格' },
    ko: { pricePlain:'가격' },
    de: { pricePlain:'Preis' },
    fr: { pricePlain:'Prix' },
    it: { pricePlain:'Prezzo' },
    es: { pricePlain:'Precio' },
  };
  for (const k in EXTRA18) { if (I18N[k]) Object.assign(I18N[k], EXTRA18[k]); }

  // ── 追加辞書19（出力ウォーターマーク設定：mypageの設定パネル）──
  const EXTRA19 = {
    ja: { wmTitle:'出力ウォーターマーク', wmTextPh:'例: © Your Name / @sns_id', wmPick:'ロゴ画像を選ぶ', wmHint:'出力画像の右下に表示されます。テキスト・ロゴのどちらか一方でも使えます。' },
    en: { wmTitle:'Export watermark', wmTextPh:'e.g. © Your Name / @handle', wmPick:'Choose logo image', wmHint:'Shown at the bottom right of exported images. Text or logo alone works too.' },
    zh: { wmTitle:'导出水印', wmTextPh:'例：© Your Name / @帐号', wmPick:'选择Logo图片', wmHint:'显示在导出图片的右下角。仅文字或仅Logo也可以。' },
    ko: { wmTitle:'내보내기 워터마크', wmTextPh:'예: © Your Name / @계정', wmPick:'로고 이미지 선택', wmHint:'내보낸 이미지의 오른쪽 아래에 표시됩니다. 텍스트나 로고 하나만으로도 사용할 수 있습니다.' },
    de: { wmTitle:'Wasserzeichen für Export', wmTextPh:'z. B. © Dein Name / @handle', wmPick:'Logo auswählen', wmHint:'Wird unten rechts im exportierten Bild angezeigt. Auch nur Text oder nur Logo möglich.' },
    fr: { wmTitle:'Filigrane d’export', wmTextPh:'ex. © Votre nom / @compte', wmPick:'Choisir un logo', wmHint:'Affiché en bas à droite de l’image exportée. Texte seul ou logo seul possible.' },
    it: { wmTitle:'Filigrana di esportazione', wmTextPh:'es. © Il tuo nome / @account', wmPick:'Scegli logo', wmHint:'Mostrata in basso a destra nell’immagine esportata. Basta anche solo testo o solo logo.' },
    es: { wmTitle:'Marca de agua de exportación', wmTextPh:'p. ej. © Tu nombre / @cuenta', wmPick:'Elegir logo', wmHint:'Se muestra abajo a la derecha de la imagen exportada. Puede usarse solo texto o solo logo.' },
  };
  for (const k in EXTRA19) { if (I18N[k]) Object.assign(I18N[k], EXTRA19[k]); }

  // ── 追加辞書20（背景紙の柄）──
  const EXTRA20 = {
    ja: { bgPatternTitle:'背景紙の柄', bgPatSolid:'無地', bgPatConcrete:'コンクリート', bgPatWood:'横木目', bgPatTile:'タイル', bgPatMarble:'大理石', bgPatBrick:'レンガ' },
    en: { bgPatternTitle:'Paper pattern', bgPatSolid:'Solid', bgPatConcrete:'Concrete', bgPatWood:'Wood', bgPatTile:'Tile', bgPatMarble:'Marble', bgPatBrick:'Brick' },
    zh: { bgPatternTitle:'背景纸纹理', bgPatSolid:'纯色', bgPatConcrete:'混凝土', bgPatWood:'木纹', bgPatTile:'瓷砖', bgPatMarble:'大理石', bgPatBrick:'砖墙' },
    ko: { bgPatternTitle:'배경지 무늬', bgPatSolid:'단색', bgPatConcrete:'콘크리트', bgPatWood:'나무결', bgPatTile:'타일', bgPatMarble:'대리석', bgPatBrick:'벽돌' },
    de: { bgPatternTitle:'Muster des Hintergrunds', bgPatSolid:'Uni', bgPatConcrete:'Beton', bgPatWood:'Holz', bgPatTile:'Fliesen', bgPatMarble:'Marmor', bgPatBrick:'Ziegel' },
    fr: { bgPatternTitle:'Motif du fond', bgPatSolid:'Uni', bgPatConcrete:'Béton', bgPatWood:'Bois', bgPatTile:'Carrelage', bgPatMarble:'Marbre', bgPatBrick:'Brique' },
    it: { bgPatternTitle:'Motivo del fondale', bgPatSolid:'Tinta unita', bgPatConcrete:'Cemento', bgPatWood:'Legno', bgPatTile:'Piastrelle', bgPatMarble:'Marmo', bgPatBrick:'Mattoni' },
    es: { bgPatternTitle:'Patrón del fondo', bgPatSolid:'Liso', bgPatConcrete:'Hormigón', bgPatWood:'Madera', bgPatTile:'Azulejos', bgPatMarble:'Mármol', bgPatBrick:'Ladrillo' },
  };
  for (const k in EXTRA20) { if (I18N[k]) Object.assign(I18N[k], EXTRA20[k]); }

  // ── 追加辞書21（背景紙・テーブルの独立カラーラベル）──
  const EXTRA21 = {
    ja: { bgPaperColorLabel:'背景紙の色', bgTableColorLabel:'テーブルの色' },
    en: { bgPaperColorLabel:'Paper color', bgTableColorLabel:'Table color' },
    zh: { bgPaperColorLabel:'背景纸颜色', bgTableColorLabel:'桌子颜色' },
    ko: { bgPaperColorLabel:'배경지 색', bgTableColorLabel:'테이블 색' },
    de: { bgPaperColorLabel:'Farbe des Hintergrunds', bgTableColorLabel:'Tischfarbe' },
    fr: { bgPaperColorLabel:'Couleur du fond', bgTableColorLabel:'Couleur de la table' },
    it: { bgPaperColorLabel:'Colore del fondale', bgTableColorLabel:'Colore del tavolo' },
    es: { bgPaperColorLabel:'Color del fondo', bgTableColorLabel:'Color de la mesa' },
  };
  for (const k in EXTRA21) { if (I18N[k]) Object.assign(I18N[k], EXTRA21[k]); }

  // ── 追加辞書22（出力モーダル：写真・機材カードの含有トグル＝「図だけ」出力対応）──
  const EXTRA22 = {
    ja: { inclPhoto:'🖼️ 写真を含める', inclGear:'💡 機材カードを含める' },
    en: { inclPhoto:'🖼️ Include photo', inclGear:'💡 Include gear cards' },
    zh: { inclPhoto:'🖼️ 包含照片', inclGear:'💡 包含器材卡片' },
    ko: { inclPhoto:'🖼️ 사진 포함', inclGear:'💡 장비 카드 포함' },
    de: { inclPhoto:'🖼️ Foto einschließen', inclGear:'💡 Equipment-Karten einschließen' },
    fr: { inclPhoto:'🖼️ Inclure la photo', inclGear:'💡 Inclure les fiches matériel' },
    it: { inclPhoto:'🖼️ Includi foto', inclGear:'💡 Includi schede attrezzatura' },
    es: { inclPhoto:'🖼️ Incluir foto', inclGear:'💡 Incluir fichas de equipo' },
  };
  for (const k in EXTRA22) { if (I18N[k]) Object.assign(I18N[k], EXTRA22[k]); }

  // ── 追加辞書23（2026-08-23 バグ修正：日本語固定だった出力ラベル・トースト・案内の多言語化）─────
  const EXTRA23 = {
    ja: { savedToast:'保存しました ✓', saveFailedPrefix:'保存失敗: ', iosLongPressHint:'画像を長押しして「写真に保存」を選んでください', savedDownloads:'保存しました（ダウンロードフォルダ）', exportCostTotal:'💰 使用機材費用合計', noLightSourceHint:'光源（ストロボ・ビデオライト）がないため光パーツは使用できません' },
    en: { savedToast:'Saved ✓', saveFailedPrefix:'Save failed: ', iosLongPressHint:'Long-press the image and choose "Save to Photos"', savedDownloads:'Saved (Downloads folder)', exportCostTotal:'💰 Total gear cost', noLightSourceHint:'No light source (strobe/video light) — light parts are unavailable' },
    zh: { savedToast:'已保存 ✓', saveFailedPrefix:'保存失败: ', iosLongPressHint:'长按图片并选择「存储到照片」', savedDownloads:'已保存（下载文件夹）', exportCostTotal:'💰 使用器材费用合计', noLightSourceHint:'没有光源（闪光灯/视频灯），无法使用控光附件' },
    ko: { savedToast:'저장했습니다 ✓', saveFailedPrefix:'저장 실패: ', iosLongPressHint:'이미지를 길게 눌러 "사진에 저장"을 선택하세요', savedDownloads:'저장했습니다 (다운로드 폴더)', exportCostTotal:'💰 사용 장비 비용 합계', noLightSourceHint:'광원(스트로브/비디오 라이트)이 없어 광 파츠를 사용할 수 없습니다' },
    de: { savedToast:'Gespeichert ✓', saveFailedPrefix:'Speichern fehlgeschlagen: ', iosLongPressHint:'Bild lange drücken und „In Fotos sichern“ wählen', savedDownloads:'Gespeichert (Downloads-Ordner)', exportCostTotal:'💰 Gesamtkosten Equipment', noLightSourceHint:'Keine Lichtquelle (Blitz/Videoleuchte) – Lichtformer nicht verfügbar' },
    fr: { savedToast:'Enregistré ✓', saveFailedPrefix:'Échec de l\'enregistrement : ', iosLongPressHint:'Appuyez longuement sur l\'image et choisissez « Enregistrer dans Photos »', savedDownloads:'Enregistré (dossier Téléchargements)', exportCostTotal:'💰 Coût total du matériel', noLightSourceHint:'Aucune source lumineuse (flash/lumière vidéo) – modeleurs indisponibles' },
    it: { savedToast:'Salvato ✓', saveFailedPrefix:'Salvataggio non riuscito: ', iosLongPressHint:'Tieni premuta l\'immagine e scegli "Salva in Foto"', savedDownloads:'Salvato (cartella Download)', exportCostTotal:'💰 Costo totale attrezzatura', noLightSourceHint:'Nessuna sorgente luminosa (flash/luce video): modificatori non disponibili' },
    es: { savedToast:'Guardado ✓', saveFailedPrefix:'Error al guardar: ', iosLongPressHint:'Mantén pulsada la imagen y elige "Guardar en Fotos"', savedDownloads:'Guardado (carpeta Descargas)', exportCostTotal:'💰 Coste total del equipo', noLightSourceHint:'Sin fuente de luz (flash/luz de vídeo): los modificadores no están disponibles' },
  };
  for (const k in EXTRA23) { if (I18N[k]) Object.assign(I18N[k], EXTRA23[k]); }

  // ── 追加辞書24（出力モーダル：SNSでの縦長画像トリミング注意書き 2026-08-24）─────
  const EXTRA24 = {
    ja: { snsTallHint:'※ X（Twitter）等では縦長画像はタップするまで一部しか表示されません。SNSには「写真オフの図だけ出力」＋元写真の2枚投稿がおすすめです' },
    en: { snsTallHint:'Tip: On X (Twitter), tall images are cropped until tapped. For SNS, export the diagram only (photo off) and post it together with your photo as 2 images.' },
    zh: { snsTallHint:'提示：在 X（Twitter）等平台，竖长图片在点开前只显示一部分。发布到社交媒体时，建议关闭照片、仅导出布光图，再与原照片一起发布两张图。' },
    ko: { snsTallHint:'※ X(Twitter) 등에서는 세로로 긴 이미지가 탭하기 전까지 일부만 표시됩니다. SNS에는 사진을 끄고 도면만 출력해 원본 사진과 2장으로 올리는 것을 추천합니다.' },
    de: { snsTallHint:'Hinweis: Auf X (Twitter) werden hohe Bilder bis zum Antippen beschnitten. Für Social Media: nur das Diagramm exportieren (Foto aus) und zusammen mit dem Foto als 2 Bilder posten.' },
    fr: { snsTallHint:'Astuce : sur X (Twitter), les images hautes sont rognées avant d\'être ouvertes. Pour les réseaux, exportez le schéma seul (photo désactivée) et publiez-le avec votre photo en 2 images.' },
    it: { snsTallHint:'Nota: su X (Twitter) le immagini verticali vengono ritagliate finché non si toccano. Per i social, esporta solo lo schema (foto off) e pubblicalo insieme alla foto come 2 immagini.' },
    es: { snsTallHint:'Consejo: en X (Twitter) las imágenes altas se recortan hasta que se tocan. Para redes, exporta solo el esquema (foto desactivada) y publícalo junto a tu foto como 2 imágenes.' },
  };
  for (const k in EXTRA24) { if (I18N[k]) Object.assign(I18N[k], EXTRA24[k]); }

  // ── 追加辞書25（機材倉庫：プレミアム枠の小さな案内。無料ユーザーのみ表示・タップでサブスク案内 2026-08-27）─────
  const EXTRA25 = {
    ja: { upsellLights:'🔒 プレミアムでライト枠 F〜J を解放（全10枠）', upsellMyset:'🔒 プレミアムでマイセット10枠（無料は5枠）' },
    en: { upsellLights:'🔒 Unlock light slots F–J with Premium (10 total)', upsellMyset:'🔒 10 My Set slots with Premium (free: 5)' },
    zh: { upsellLights:'🔒 高级版解锁灯位 F〜J（共10个）', upsellMyset:'🔒 高级版可用10个我的套装（免费版5个）' },
    ko: { upsellLights:'🔒 프리미엄으로 라이트 슬롯 F〜J 해제(총 10칸)', upsellMyset:'🔒 프리미엄으로 마이 세트 10칸(무료 5칸)' },
    de: { upsellLights:'🔒 Mit Premium Licht-Slots F–J freischalten (insgesamt 10)', upsellMyset:'🔒 10 My-Set-Plätze mit Premium (gratis: 5)' },
    fr: { upsellLights:'🔒 Débloquez les emplacements F–J avec Premium (10 au total)', upsellMyset:'🔒 10 emplacements My Set avec Premium (gratuit : 5)' },
    it: { upsellLights:'🔒 Sblocca gli slot luce F–J con Premium (10 in totale)', upsellMyset:'🔒 10 slot My Set con Premium (gratis: 5)' },
    es: { upsellLights:'🔒 Desbloquea los huecos F–J con Premium (10 en total)', upsellMyset:'🔒 10 huecos de Mi Set con Premium (gratis: 5)' },
  };
  for (const k in EXTRA25) { if (I18N[k]) Object.assign(I18N[k], EXTRA25[k]); }

  // ── 追加辞書7（ライトへの機材追加トースト：どの枠A-Jに追加したか明示）─────
  const EXTRA7 = {
    ja: { addedToLight:(name,slot)=>`${name} を ライト${slot} に追加しました`, addedToDiagram:(name)=>`${name} をライティング図に追加しました` },
    en: { addedToLight:(name,slot)=>`Added ${name} to Light ${slot}`, addedToDiagram:(name)=>`Added ${name} to the diagram` },
    zh: { addedToLight:(name,slot)=>`已将 ${name} 添加到 灯${slot}`, addedToDiagram:(name)=>`已将 ${name} 添加到布光图` },
    ko: { addedToLight:(name,slot)=>`${name}을(를) 조명 ${slot}에 추가했습니다`, addedToDiagram:(name)=>`${name}을(를) 조명도에 추가했습니다` },
    de: { addedToLight:(name,slot)=>`${name} zu Licht ${slot} hinzugefügt`, addedToDiagram:(name)=>`${name} zum Diagramm hinzugefügt` },
    fr: { addedToLight:(name,slot)=>`${name} ajouté à Lumière ${slot}`, addedToDiagram:(name)=>`${name} ajouté au schéma` },
    it: { addedToLight:(name,slot)=>`${name} aggiunto a Luce ${slot}`, addedToDiagram:(name)=>`${name} aggiunto allo schema` },
    es: { addedToLight:(name,slot)=>`${name} añadido a Luz ${slot}`, addedToDiagram:(name)=>`${name} añadido al esquema` },
  };
  for (const k in EXTRA7) { if (I18N[k]) Object.assign(I18N[k], EXTRA7[k]); }

  // ── 追加辞書8（防湿庫ページ）─────────────
  const EXTRA8 = {
    ja: { navCabinet:'防湿庫', cabinetTitle:'防湿庫', cabinetCamera:'カメラ', cabinetLens:'レンズ', cabinetAdd:'追加', cabinetAddCamera:'カメラを追加', cabinetAddLens:'レンズを追加', cabinetMaker:'メーカー', cabinetModel:'型番', cabinetImage:'画像', cabinetChoosePhoto:'写真を選ぶ', cabinetImgHint:'未選択ならデフォルト画像を使います', cabinetAdded:(n)=>`${n} を追加しました`, cabinetConfirmDelete:'この機材を削除しますか？', cabinetStorageFull:'保存容量の上限に達しました。写真を減らすか、画像なしで登録してください。', save:'保存' },
    en: { navCabinet:'Dry Cabinet', cabinetTitle:'Dry Cabinet', cabinetCamera:'Camera', cabinetLens:'Lens', cabinetAdd:'Add', cabinetAddCamera:'Add camera', cabinetAddLens:'Add lens', cabinetMaker:'Maker', cabinetModel:'Model', cabinetImage:'Image', cabinetChoosePhoto:'Choose photo', cabinetImgHint:'Uses a default image if none is chosen', cabinetAdded:(n)=>`Added ${n}`, cabinetConfirmDelete:'Delete this gear?', cabinetStorageFull:'Storage limit reached. Remove some photos or register without an image.', save:'Save' },
    zh: { navCabinet:'防潮箱', cabinetTitle:'防潮箱', cabinetCamera:'相机', cabinetLens:'镜头', cabinetAdd:'添加', cabinetAddCamera:'添加相机', cabinetAddLens:'添加镜头', cabinetMaker:'厂商', cabinetModel:'型号', cabinetImage:'图片', cabinetChoosePhoto:'选择照片', cabinetImgHint:'未选择时使用默认图片', cabinetAdded:(n)=>`已添加 ${n}`, cabinetConfirmDelete:'要删除该器材吗？', cabinetStorageFull:'已达到存储上限。请减少照片或不使用图片登记。', save:'保存' },
    ko: { navCabinet:'방습고', cabinetTitle:'방습고', cabinetCamera:'카메라', cabinetLens:'렌즈', cabinetAdd:'추가', cabinetAddCamera:'카메라 추가', cabinetAddLens:'렌즈 추가', cabinetMaker:'제조사', cabinetModel:'모델', cabinetImage:'이미지', cabinetChoosePhoto:'사진 선택', cabinetImgHint:'선택하지 않으면 기본 이미지를 사용합니다', cabinetAdded:(n)=>`${n} 추가됨`, cabinetConfirmDelete:'이 장비를 삭제할까요?', cabinetStorageFull:'저장 용량 한도에 도달했습니다. 사진을 줄이거나 이미지 없이 등록하세요.', save:'저장' },
    de: { navCabinet:'Trockenschrank', cabinetTitle:'Trockenschrank', cabinetCamera:'Kamera', cabinetLens:'Objektiv', cabinetAdd:'Hinzufügen', cabinetAddCamera:'Kamera hinzufügen', cabinetAddLens:'Objektiv hinzufügen', cabinetMaker:'Hersteller', cabinetModel:'Modell', cabinetImage:'Bild', cabinetChoosePhoto:'Foto wählen', cabinetImgHint:'Ohne Auswahl wird ein Standardbild verwendet', cabinetAdded:(n)=>`${n} hinzugefügt`, cabinetConfirmDelete:'Dieses Gerät löschen?', cabinetStorageFull:'Speicherlimit erreicht. Entfernen Sie einige Fotos oder registrieren Sie ohne Bild.', save:'Speichern' },
    fr: { navCabinet:'Boîte anti-humidité', cabinetTitle:'Boîte anti-humidité', cabinetCamera:'Appareil', cabinetLens:'Objectif', cabinetAdd:'Ajouter', cabinetAddCamera:'Ajouter un appareil', cabinetAddLens:'Ajouter un objectif', cabinetMaker:'Marque', cabinetModel:'Modèle', cabinetImage:'Image', cabinetChoosePhoto:'Choisir une photo', cabinetImgHint:'Sans sélection, une image par défaut est utilisée', cabinetAdded:(n)=>`${n} ajouté`, cabinetConfirmDelete:'Supprimer ce matériel ?', cabinetStorageFull:'Limite de stockage atteinte. Supprimez des photos ou enregistrez sans image.', save:'Enregistrer' },
    it: { navCabinet:'Vetrina antiumidità', cabinetTitle:'Vetrina antiumidità', cabinetCamera:'Fotocamera', cabinetLens:'Obiettivo', cabinetAdd:'Aggiungi', cabinetAddCamera:'Aggiungi fotocamera', cabinetAddLens:'Aggiungi obiettivo', cabinetMaker:'Marca', cabinetModel:'Modello', cabinetImage:'Immagine', cabinetChoosePhoto:'Scegli foto', cabinetImgHint:'Senza selezione si usa un\'immagine predefinita', cabinetAdded:(n)=>`${n} aggiunto`, cabinetConfirmDelete:'Eliminare questa attrezzatura?', cabinetStorageFull:'Limite di archiviazione raggiunto. Rimuovi alcune foto o registra senza immagine.', save:'Salva' },
    es: { navCabinet:'Vitrina antihumedad', cabinetTitle:'Vitrina antihumedad', cabinetCamera:'Cámara', cabinetLens:'Objetivo', cabinetAdd:'Añadir', cabinetAddCamera:'Añadir cámara', cabinetAddLens:'Añadir objetivo', cabinetMaker:'Marca', cabinetModel:'Modelo', cabinetImage:'Imagen', cabinetChoosePhoto:'Elegir foto', cabinetImgHint:'Si no se elige, se usa una imagen predeterminada', cabinetAdded:(n)=>`${n} añadido`, cabinetConfirmDelete:'¿Eliminar este equipo?', cabinetStorageFull:'Límite de almacenamiento alcanzado. Elimina algunas fotos o registra sin imagen.', save:'Guardar' },
  };
  for (const k in EXTRA8) { if (I18N[k]) Object.assign(I18N[k], EXTRA8[k]); }

  // ── 追加辞書9（ライト一括リセット／全初期化）─────────────
  const EXTRA9 = {
    ja: { resetLights:'↺ 一括リセット', resetLightsConfirm:'すべてのライトの機材をリセットしますか？', resetLightsDone:'ライトをリセットしました', resetLightsEmpty:'リセットする機材がありません', resetAll:'🗑 すべてリセット（初期化）', resetAllHint:'レシピ・機材・防湿庫・設定をすべて削除して初期状態に戻します。', resetAllConfirm:'全データ（レシピ・機材・防湿庫・設定）を削除して初期状態に戻します。元に戻せません。よろしいですか？', resetAllConfirm2:'本当に初期化しますか？この操作は取り消せません。' },
    en: { resetLights:'↺ Reset all', resetLightsConfirm:'Reset the gear on all lights?', resetLightsDone:'Lights reset', resetLightsEmpty:'No gear to reset', resetAll:'🗑 Reset everything', resetAllHint:'Deletes all recipes, gear, the dry cabinet and settings, returning to the initial state.', resetAllConfirm:'This deletes all data (recipes, gear, dry cabinet, settings) and resets to the initial state. This cannot be undone. Continue?', resetAllConfirm2:'Really reset everything? This action cannot be undone.' },
    zh: { resetLights:'↺ 全部重置', resetLightsConfirm:'要重置所有灯的器材吗？', resetLightsDone:'已重置灯光', resetLightsEmpty:'没有可重置的器材', resetAll:'🗑 全部重置（初始化）', resetAllHint:'删除所有配方、器材、防潮箱和设置，恢复到初始状态。', resetAllConfirm:'将删除所有数据（配方、器材、防潮箱、设置）并恢复初始状态。此操作无法撤销。是否继续？', resetAllConfirm2:'确定要初始化吗？此操作无法撤销。' },
    ko: { resetLights:'↺ 전체 초기화', resetLightsConfirm:'모든 조명의 장비를 초기화할까요?', resetLightsDone:'조명을 초기화했습니다', resetLightsEmpty:'초기화할 장비가 없습니다', resetAll:'🗑 전체 초기화', resetAllHint:'레시피·장비·방습고·설정을 모두 삭제하고 초기 상태로 되돌립니다.', resetAllConfirm:'모든 데이터(레시피·장비·방습고·설정)를 삭제하고 초기 상태로 되돌립니다. 되돌릴 수 없습니다. 계속할까요?', resetAllConfirm2:'정말로 초기화할까요? 이 작업은 되돌릴 수 없습니다.' },
    de: { resetLights:'↺ Alle zurücksetzen', resetLightsConfirm:'Das Equipment aller Leuchten zurücksetzen?', resetLightsDone:'Leuchten zurückgesetzt', resetLightsEmpty:'Kein Equipment zum Zurücksetzen', resetAll:'🗑 Alles zurücksetzen', resetAllHint:'Löscht alle Rezepte, Equipment, den Trockenschrank und Einstellungen und stellt den Ausgangszustand wieder her.', resetAllConfirm:'Dies löscht alle Daten (Rezepte, Equipment, Trockenschrank, Einstellungen) und setzt auf den Ausgangszustand zurück. Das kann nicht rückgängig gemacht werden. Fortfahren?', resetAllConfirm2:'Wirklich alles zurücksetzen? Dieser Vorgang kann nicht rückgängig gemacht werden.' },
    fr: { resetLights:'↺ Tout réinitialiser', resetLightsConfirm:'Réinitialiser le matériel de toutes les lumières ?', resetLightsDone:'Lumières réinitialisées', resetLightsEmpty:'Aucun matériel à réinitialiser', resetAll:'🗑 Tout réinitialiser', resetAllHint:'Supprime toutes les recettes, le matériel, la boîte anti-humidité et les réglages, et revient à l\'état initial.', resetAllConfirm:'Ceci supprime toutes les données (recettes, matériel, boîte anti-humidité, réglages) et revient à l\'état initial. Action irréversible. Continuer ?', resetAllConfirm2:'Vraiment tout réinitialiser ? Cette action est irréversible.' },
    it: { resetLights:'↺ Reimposta tutto', resetLightsConfirm:'Reimpostare l\'attrezzatura di tutte le luci?', resetLightsDone:'Luci reimpostate', resetLightsEmpty:'Nessuna attrezzatura da reimpostare', resetAll:'🗑 Reimposta tutto', resetAllHint:'Elimina tutte le ricette, l\'attrezzatura, la vetrina antiumidità e le impostazioni, tornando allo stato iniziale.', resetAllConfirm:'Questo elimina tutti i dati (ricette, attrezzatura, vetrina antiumidità, impostazioni) e ripristina lo stato iniziale. Operazione irreversibile. Continuare?', resetAllConfirm2:'Reimpostare davvero tutto? Questa operazione è irreversibile.' },
    es: { resetLights:'↺ Restablecer todo', resetLightsConfirm:'¿Restablecer el equipo de todas las luces?', resetLightsDone:'Luces restablecidas', resetLightsEmpty:'No hay equipo que restablecer', resetAll:'🗑 Restablecer todo', resetAllHint:'Elimina todas las recetas, el equipo, la vitrina antihumedad y los ajustes, y vuelve al estado inicial.', resetAllConfirm:'Esto elimina todos los datos (recetas, equipo, vitrina antihumedad, ajustes) y restablece el estado inicial. No se puede deshacer. ¿Continuar?', resetAllConfirm2:'¿Restablecer todo de verdad? Esta acción no se puede deshacer.' },
  };
  for (const k in EXTRA9) { if (I18N[k]) Object.assign(I18N[k], EXTRA9[k]); }

  // ── 追加辞書10（カスタム機材の光源スイッチ）─────────────
  const EXTRA10 = {
    ja: { lightSourceToggle:'💡 光源として扱う', lightSourceHint:'ONにするとライトに光パーツ（配光・出力）が有効になります' },
    en: { lightSourceToggle:'💡 Treat as light source', lightSourceHint:'When on, light controls (beam, output) are enabled.' },
    zh: { lightSourceToggle:'💡 作为光源', lightSourceHint:'开启后，灯光的配光、输出将可用。' },
    ko: { lightSourceToggle:'💡 광원으로 사용', lightSourceHint:'켜면 조명의 배광·출력을 사용할 수 있습니다.' },
    de: { lightSourceToggle:'💡 Als Lichtquelle', lightSourceHint:'Wenn aktiv, ist die Lichtsteuerung (Abstrahlung, Leistung) verfügbar.' },
    fr: { lightSourceToggle:'💡 Traiter comme source', lightSourceHint:'Activé, les réglages de lumière (diffusion, puissance) sont disponibles.' },
    it: { lightSourceToggle:'💡 Tratta come fonte di luce', lightSourceHint:'Se attivo, i controlli luce (diffusione, potenza) sono disponibili.' },
    es: { lightSourceToggle:'💡 Tratar como fuente de luz', lightSourceHint:'Al activar, se habilitan los controles de luz (haz, potencia).' },
  };
  for (const k in EXTRA10) { if (I18N[k]) Object.assign(I18N[k], EXTRA10[k]); }

  // 切替UIに出す言語（表示名はネイティブ表記）
  const LANGS = [
    { code:'ja', label:'日本語' }, { code:'en', label:'English' }, { code:'zh', label:'中文' },
    { code:'ko', label:'한국어' }, { code:'de', label:'Deutsch' }, { code:'fr', label:'Français' },
    { code:'it', label:'Italiano' }, { code:'es', label:'Español' },
  ];
  const LANG_KEY = 'lr_lang';

  // 言語判定：保存された選択 > ブラウザ言語 > en
  function detectLang() {
    let saved = null; try { saved = localStorage.getItem(LANG_KEY); } catch (e) {} // Cookie全ブロック等で SecurityError → 既定言語へ
    if (saved && I18N[saved]) return saved;
    const n = (navigator.language || 'en').toLowerCase();
    if (n.startsWith('ja')) return 'ja';
    if (n.startsWith('zh')) return 'zh';
    if (n.startsWith('ko')) return 'ko';
    if (n.startsWith('de')) return 'de';
    if (n.startsWith('fr')) return 'fr';
    if (n.startsWith('it')) return 'it';
    if (n.startsWith('es')) return 'es';
    return 'en';
  }

  const LANG = detectLang();
  const T = I18N[LANG];
  try { document.documentElement.lang = LANG; } catch (e) {}

  // ── 通貨（ユーザー選択・為替換算はしない。数値はユーザー入力のまま）──
  const CURRENCIES = [
    { code:'JPY', symbol:'¥' }, { code:'USD', symbol:'$' }, { code:'EUR', symbol:'€' },
    { code:'GBP', symbol:'£' }, { code:'KRW', symbol:'₩' }, { code:'CNY', symbol:'¥' },
    { code:'CAD', symbol:'C$' }, { code:'AUD', symbol:'A$' }, { code:'CHF', symbol:'CHF' },
    { code:'MXN', symbol:'$' }, { code:'BRL', symbol:'R$' },
  ];
  const CUR_KEY = 'lr_currency';
  const LANG_TO_CUR = { ja:'JPY', zh:'CNY', ko:'KRW', de:'EUR', fr:'EUR', it:'EUR', es:'EUR', en:'USD' };
  const LANG_TO_LOCALE = { ja:'ja-JP', zh:'zh-CN', ko:'ko-KR', de:'de-DE', fr:'fr-FR', it:'it-IT', es:'es-ES', en:'en-US' };
  function detectCurrency() {
    let saved = null; try { saved = localStorage.getItem(CUR_KEY); } catch (e) {}
    if (saved && CURRENCIES.some((c) => c.code === saved)) return saved;
    return LANG_TO_CUR[LANG] || 'USD';
  }
  const CUR = detectCurrency();
  // 金額整形：選択通貨の記号で表示（小数なし）。換算はしない。
  function formatMoney(n) {
    const num = Number(n) || 0;
    try {
      return new Intl.NumberFormat(LANG_TO_LOCALE[LANG] || undefined, {
        style: 'currency', currency: CUR, maximumFractionDigits: 0, minimumFractionDigits: 0,
      }).format(num);
    } catch (e) {
      const sym = (CURRENCIES.find((c) => c.code === CUR) || {}).symbol || '';
      return sym + num.toLocaleString();
    }
  }
  global.formatMoney = formatMoney;
  global.LR_CURRENCY = CUR;
  global.LR_CURRENCIES = CURRENCIES;

  // 右上に言語セレクタを自動注入（選択変更で保存→リロード）
  // 設定ページ（マイページ）にだけインライン描画する。
  // マウント先 #lrLangMount / #lrCurMount が無いページでは何もしない（フローティングは廃止＝他ページのボタンと被らない）。
  function mountSwitcher() {
    const selCss =
      'background:#252525;color:#e8e8e8;border:1px solid #c8a96e;' +
      'border-radius:8px;padding:6px 10px;font-size:13px;font-weight:600;' +
      'outline:none;cursor:pointer;-webkit-appearance:none;appearance:none;';
    const langMount = document.getElementById('lrLangMount');
    if (langMount && !langMount.querySelector('select')) {
      const sel = document.createElement('select');
      sel.setAttribute('aria-label', 'Language');
      sel.style.cssText = selCss;
      for (const l of LANGS) {
        const o = document.createElement('option');
        o.value = l.code; o.textContent = '🌐 ' + l.label;
        if (l.code === LANG) o.selected = true;
        sel.appendChild(o);
      }
      sel.addEventListener('change', function () {
        localStorage.setItem(LANG_KEY, sel.value); location.reload();
      });
      langMount.appendChild(sel);
    }
    const curMount = document.getElementById('lrCurMount');
    if (curMount && !curMount.querySelector('select')) {
      const csel = document.createElement('select');
      csel.setAttribute('aria-label', 'Currency');
      csel.style.cssText = selCss;
      for (const c of CURRENCIES) {
        const o = document.createElement('option');
        o.value = c.code; o.textContent = c.symbol + ' ' + c.code;
        if (c.code === CUR) o.selected = true;
        csel.appendChild(o);
      }
      csel.addEventListener('change', function () {
        localStorage.setItem(CUR_KEY, csel.value); location.reload();
      });
      curMount.appendChild(csel);
    }
  }
  // data-i18n 属性を走査して翻訳を適用（動的DOM後にも呼べるよう root 指定可）
  //   data-i18n       … textContent
  //   data-i18n-ph    … placeholder 属性
  //   data-i18n-dph   … data-placeholder 属性（contenteditable 用）
  //   data-i18n-title … title 属性
  function applyDataI18n(root) {
    root = root || document;
    const val = (k) => { const v = T[k]; return typeof v === 'function' ? v() : v; };
    root.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.getAttribute('data-i18n'); if (T[k] != null) el.textContent = val(k);
    });
    root.querySelectorAll('[data-i18n-ph]').forEach((el) => {
      const k = el.getAttribute('data-i18n-ph'); if (T[k] != null) el.setAttribute('placeholder', val(k));
    });
    root.querySelectorAll('[data-i18n-dph]').forEach((el) => {
      const k = el.getAttribute('data-i18n-dph'); if (T[k] != null) el.setAttribute('data-placeholder', val(k));
    });
    root.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const k = el.getAttribute('data-i18n-title'); if (T[k] != null) el.setAttribute('title', val(k));
    });
  }
  global.applyDataI18n = applyDataI18n;

  function initI18n() { mountSwitcher(); applyDataI18n(document); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
  } else {
    initI18n();
  }

  // ── サブスクリプション（無料枠 vs 有料枠）の共通判定 ─────────────
  //  決済・クラウドは未実装。lr_subscribed フラグ（開発用トグルで切替）で有料枠を解錠する。
  //  無料: レシピ30 / ライト5(A-E) / マイセット5 / カメラ3 / レンズ5
  //  有料: 無制限   / 10(A-J)     / 10          / カメラ30 / レンズ50
  //  ※レンズ枠は自由入力でカメラも入れられてしまうため、無料はカメラ枠と同水準に抑える
  //   （2026-07-28 ユーザー決定。10→5に変更）
  const SUB_KEY = 'lr_subscribed';
  function isSubscribed(){ try{ return localStorage.getItem(SUB_KEY) === '1'; }catch(e){ return false; } }
  function setSubscribed(on){ try{ localStorage.setItem(SUB_KEY, on ? '1' : '0'); }catch(e){} }
  global.isSubscribed = isSubscribed;
  global.setSubscribed = setSubscribed;
  global.maxRecipes = function(){ return isSubscribed() ? Infinity : 30; };
  global.maxLights  = function(){ return isSubscribed() ? 10 : 5; };
  global.maxMyset   = function(){ return isSubscribed() ? 10 : 5; };
  global.maxCameras = function(){ return isSubscribed() ? 30 : 3; };   // 防湿庫・カメラ枠
  global.maxLenses  = function(){ return isSubscribed() ? 50 : 5; };   // 防湿庫・レンズ枠
  global.LIGHT_LABELS = ['A','B','C','D','E','F','G','H','I','J'];

  // 既存コードとの互換：グローバルに公開（各HTMLの旧定義を置き換える）
  global.I18N = I18N;          // index.html 互換
  global.I18N_DATA = I18N;     // builder.html 互換（同じ辞書を参照）
  global.detectLang = detectLang;
  global.LANG = LANG;
  global.T = T;
})(window);
