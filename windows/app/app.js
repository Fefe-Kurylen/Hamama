(() => {
'use strict';
/* ================= Langues ================= */
// Clé = texte français de l’interface. Valeurs : [en, es, de, it, pt, ar]. {0}, {1}… = parties variables.
const I18N = {
"Rechercher dans les messages":["Search messages","Buscar en los mensajes","Nachrichten durchsuchen","Cerca nei messaggi","Pesquisar nas mensagens","البحث في الرسائل"],
"Ce dossier":["This folder","Esta carpeta","Dieser Ordner","Questa cartella","Esta pasta","هذا المجلد"],
"Partout":["Everywhere","En todas partes","Überall","Ovunque","Em todo o lado","في كل مكان"],
"Actualiser (F5)":["Refresh (F5)","Actualizar (F5)","Aktualisieren (F5)","Aggiorna (F5)","Atualizar (F5)","تحديث (F5)"],
"Actualiser":["Refresh","Actualizar","Aktualisieren","Aggiorna","Atualizar","تحديث"],
"Personnaliser Hamama":["Customize Hamama","Personalizar Hamama","Hamama anpassen","Personalizza Hamama","Personalizar o Hamama","تخصيص حمامة"],
"Soutenir Hamama":["Support Hamama","Apoyar Hamama","Hamama unterstützen","Sostieni Hamama","Apoiar o Hamama","ادعم حمامة"],
"Nouveau message":["New message","Nuevo mensaje","Neue Nachricht","Nuovo messaggio","Nova mensagem","رسالة جديدة"],
"Nouveau message (N)":["New message (N)","Nuevo mensaje (N)","Neue Nachricht (N)","Nuovo messaggio (N)","Nova mensagem (N)","رسالة جديدة (N)"],
"Afficher / masquer les dossiers":["Show / hide folders","Mostrar / ocultar carpetas","Ordner ein-/ausblenden","Mostra / nascondi cartelle","Mostrar / ocultar pastas","إظهار / إخفاء المجلدات"],
"Mettre à jour":["Update","Actualizar","Aktualisieren","Aggiorna","Atualizar","تحديث"],
"Nouvelle version":["New version","Nueva versión","Neue Version","Nuova versione","Nova versão","إصدار جديد"],
"Bienvenue dans Hamama":["Welcome to Hamama","Bienvenido a Hamama","Willkommen bei Hamama","Benvenuto in Hamama","Bem-vindo ao Hamama","مرحبًا بك في حمامة"],
"Ajoute ta première boîte mail pour commencer.":["Add your first mailbox to get started.","Añade tu primer buzón para empezar.","Füge dein erstes Postfach hinzu, um zu beginnen.","Aggiungi la tua prima casella di posta per iniziare.","Adiciona a tua primeira caixa de correio para começar.","أضف أول صندوق بريد للبدء."],
"Tes mots de passe restent chiffrés sur ton ordinateur":["Your passwords stay encrypted on your computer","Tus contraseñas permanecen cifradas en tu ordenador","Deine Passwörter bleiben verschlüsselt auf deinem Computer","Le tue password restano cifrate sul tuo computer","As tuas palavras-passe ficam encriptadas no teu computador","تبقى كلمات المرور مشفّرة على حاسوبك"],
"Ajouter un compte":["Add an account","Añadir una cuenta","Konto hinzufügen","Aggiungi un account","Adicionar uma conta","إضافة حساب"],
"Boîte de réception":["Inbox","Bandeja de entrada","Posteingang","Posta in arrivo","Caixa de entrada","البريد الوارد"],
"Brouillons":["Drafts","Borradores","Entwürfe","Bozze","Rascunhos","المسودات"],
"Envoyés":["Sent","Enviados","Gesendet","Inviati","Enviados","المرسلة"],
"Archives":["Archive","Archivo","Archiv","Archivio","Arquivo","الأرشيف"],
"Tous les messages":["All mail","Todos los mensajes","Alle Nachrichten","Tutti i messaggi","Todas as mensagens","كل الرسائل"],
"Suivis":["Starred","Destacados","Markiert","Speciali","Com estrela","المميّزة"],
"Indésirables":["Junk","Correo no deseado","Junk","Indesiderata","Lixo eletrónico","غير المرغوب فيه"],
"Corbeille":["Trash","Papelera","Papierkorb","Cestino","Lixo","سلة المهملات"],
"Toutes les boîtes":["All inboxes","Todas las bandejas","Alle Posteingänge","Tutte le caselle","Todas as caixas","كل الصناديق"],
"Tout marquer comme lu":["Mark all as read","Marcar todo como leído","Alle als gelesen markieren","Segna tutto come letto","Marcar tudo como lido","تعليم الكل كمقروء"],
"Sélectionner plusieurs messages":["Select several messages","Seleccionar varios mensajes","Mehrere Nachrichten auswählen","Seleziona più messaggi","Selecionar várias mensagens","تحديد عدة رسائل"],
"Tous":["All","Todos","Alle","Tutti","Todos","الكل"],
"Non lus":["Unread","No leídos","Ungelesen","Non letti","Não lidas","غير مقروءة"],
"Pièces jointes":["Attachments","Adjuntos","Anhänge","Allegati","Anexos","المرفقات"],
"Marquer comme lu":["Mark as read","Marcar como leído","Als gelesen markieren","Segna come letto","Marcar como lida","تعليم كمقروء"],
"Marquer comme non lu":["Mark as unread","Marcar como no leído","Als ungelesen markieren","Segna come non letto","Marcar como não lida","تعليم كغير مقروء"],
"Marquer comme lu (U)":["Mark as read (U)","Marcar como leído (U)","Als gelesen markieren (U)","Segna come letto (U)","Marcar como lida (U)","تعليم كمقروء (U)"],
"Marquer comme non lu (U)":["Mark as unread (U)","Marcar como no leído (U)","Als ungelesen markieren (U)","Segna come non letto (U)","Marcar como não lida (U)","تعليم كغير مقروء (U)"],
"Suivre":["Star","Destacar","Markieren","Aggiungi a speciali","Marcar com estrela","تمييز"],
"Suivre (S)":["Star (S)","Destacar (S)","Markieren (S)","Aggiungi a speciali (S)","Marcar com estrela (S)","تمييز (S)"],
"Ne plus suivre":["Unstar","Quitar destacado","Markierung entfernen","Rimuovi da speciali","Remover estrela","إلغاء التمييز"],
"Ne plus suivre (S)":["Unstar (S)","Quitar destacado (S)","Markierung entfernen (S)","Rimuovi da speciali (S)","Remover estrela (S)","إلغاء التمييز (S)"],
"Archiver":["Archive","Archivar","Archivieren","Archivia","Arquivar","أرشفة"],
"Archiver (E)":["Archive (E)","Archivar (E)","Archivieren (E)","Archivia (E)","Arquivar (E)","أرشفة (E)"],
"Déplacer":["Move","Mover","Verschieben","Sposta","Mover","نقل"],
"Déplacer vers…":["Move to…","Mover a…","Verschieben nach…","Sposta in…","Mover para…","نقل إلى…"],
"Déplacer vers… (V)":["Move to… (V)","Mover a… (V)","Verschieben nach… (V)","Sposta in… (V)","Mover para… (V)","نقل إلى… (V)"],
"Supprimer":["Delete","Eliminar","Löschen","Elimina","Eliminar","حذف"],
"Supprimer (Suppr)":["Delete (Del)","Eliminar (Supr)","Löschen (Entf)","Elimina (Canc)","Eliminar (Del)","حذف (Del)"],
"Annuler la sélection":["Clear selection","Anular la selección","Auswahl aufheben","Annulla selezione","Anular seleção","إلغاء التحديد"],
"Indésirable":["Junk","No deseado","Junk","Indesiderato","Lixo","غير مرغوب"],
"Signaler comme indésirable":["Report as junk","Marcar como no deseado","Als Junk melden","Segnala come indesiderato","Marcar como lixo","الإبلاغ كغير مرغوب"],
"Ouvrir":["Open","Abrir","Öffnen","Apri","Abrir","فتح"],
"Répondre":["Reply","Responder","Antworten","Rispondi","Responder","ردّ"],
"Répondre (R)":["Reply (R)","Responder (R)","Antworten (R)","Rispondi (R)","Responder (R)","ردّ (R)"],
"Répondre à tous":["Reply all","Responder a todos","Allen antworten","Rispondi a tutti","Responder a todos","الرد على الكل"],
"Répondre à tous (A)":["Reply all (A)","Responder a todos (A)","Allen antworten (A)","Rispondi a tutti (A)","Responder a todos (A)","الرد على الكل (A)"],
"Rép. à tous":["Reply all","Resp. a todos","Allen antw.","Risp. a tutti","Resp. a todos","الرد على الكل"],
"Transférer":["Forward","Reenviar","Weiterleiten","Inoltra","Reencaminhar","إعادة توجيه"],
"Transférer (F)":["Forward (F)","Reenviar (F)","Weiterleiten (F)","Inoltra (F)","Reencaminhar (F)","إعادة توجيه (F)"],
"Répondu":["Replied","Respondido","Beantwortet","Risposto","Respondida","تم الرد"],
"Retour à la liste (Échap)":["Back to list (Esc)","Volver a la lista (Esc)","Zurück zur Liste (Esc)","Torna all’elenco (Esc)","Voltar à lista (Esc)","العودة إلى القائمة (Esc)"],
"Plus d’actions":["More actions","Más acciones","Weitere Aktionen","Altre azioni","Mais ações","إجراءات أخرى"],
"Imprimer":["Print","Imprimir","Drucken","Stampa","Imprimir","طباعة"],
"Afficher la source":["Show source","Ver código fuente","Quelltext anzeigen","Mostra sorgente","Mostrar código-fonte","عرض المصدر"],
"Source du message":["Message source","Código fuente del mensaje","Nachrichtenquelltext","Sorgente del messaggio","Código-fonte da mensagem","مصدر الرسالة"],
"Afficher les images":["Show images","Mostrar imágenes","Bilder anzeigen","Mostra immagini","Mostrar imagens","عرض الصور"],
"Images : toujours affichées":["Images: always shown","Imágenes: siempre visibles","Bilder: immer angezeigt","Immagini: sempre visibili","Imagens: sempre visíveis","الصور: معروضة دائمًا"],
"Copier l’adresse de l’expéditeur":["Copy sender address","Copiar la dirección del remitente","Absenderadresse kopieren","Copia indirizzo del mittente","Copiar endereço do remetente","نسخ عنوان المرسل"],
"Copier l’adresse":["Copy address","Copiar la dirección","Adresse kopieren","Copia indirizzo","Copiar endereço","نسخ العنوان"],
"Adresse copiée":["Address copied","Dirección copiada","Adresse kopiert","Indirizzo copiato","Endereço copiado","تم نسخ العنوان"],
"Ouvrir le lien":["Open link","Abrir enlace","Link öffnen","Apri link","Abrir ligação","فتح الرابط"],
"Copier le lien":["Copy link","Copiar enlace","Link kopieren","Copia link","Copiar ligação","نسخ الرابط"],
"Lien copié":["Link copied","Enlace copiado","Link kopiert","Link copiato","Ligação copiada","تم نسخ الرابط"],
"Copier":["Copy","Copiar","Kopieren","Copia","Copiar","نسخ"],
"Copié":["Copied","Copiado","Kopiert","Copiato","Copiado","تم النسخ"],
"Fermer":["Close","Cerrar","Schließen","Chiudi","Fechar","إغلاق"],
"Enregistrer":["Save","Guardar","Speichern","Salva","Guardar","حفظ"],
"Enregistré":["Saved","Guardado","Gespeichert","Salvato","Guardado","تم الحفظ"],
"Tout enregistrer":["Save all","Guardar todo","Alle speichern","Salva tutto","Guardar tudo","حفظ الكل"],
"Pièces jointes enregistrées":["Attachments saved","Adjuntos guardados","Anhänge gespeichert","Allegati salvati","Anexos guardados","تم حفظ المرفقات"],
"Aucun message sélectionné":["No message selected","Ningún mensaje seleccionado","Keine Nachricht ausgewählt","Nessun messaggio selezionato","Nenhuma mensagem selecionada","لم يتم تحديد أي رسالة"],
"Choisis un message dans la liste pour le lire ici.":["Pick a message in the list to read it here.","Elige un mensaje de la lista para leerlo aquí.","Wähle eine Nachricht aus der Liste, um sie hier zu lesen.","Scegli un messaggio dall’elenco per leggerlo qui.","Escolhe uma mensagem na lista para a ler aqui.","اختر رسالة من القائمة لقراءتها هنا."],
"nouveau":["new","nuevo","neu","nuovo","nova","جديد"],
"naviguer":["navigate","navegar","navigieren","naviga","navegar","تنقّل"],
"répondre":["reply","responder","antworten","rispondi","responder","ردّ"],
"archiver":["archive","archivar","archivieren","archivia","arquivar","أرشفة"],
"tous les raccourcis":["all shortcuts","todos los atajos","alle Kurzbefehle","tutte le scorciatoie","todos os atalhos","كل الاختصارات"],
"Utilise la barre au-dessus de la liste, ou :":["Use the bar above the list, or:","Usa la barra sobre la lista, o:","Nutze die Leiste über der Liste oder:","Usa la barra sopra l’elenco, oppure:","Usa a barra acima da lista, ou:","استخدم الشريط فوق القائمة، أو:"],
"Lu":["Read","Leído","Gelesen","Letto","Lida","مقروء"],
"Impossible d’ouvrir ce message":["Can’t open this message","No se puede abrir este mensaje","Nachricht kann nicht geöffnet werden","Impossibile aprire questo messaggio","Não é possível abrir esta mensagem","تعذّر فتح هذه الرسالة"],
"Réessayer":["Try again","Reintentar","Erneut versuchen","Riprova","Tentar novamente","إعادة المحاولة"],
"Images distantes bloquées pour protéger ta vie privée (pixels espions).":["Remote images blocked to protect your privacy (tracking pixels).","Imágenes remotas bloqueadas para proteger tu privacidad (píxeles espía).","Externe Bilder zum Schutz deiner Privatsphäre blockiert (Tracking-Pixel).","Immagini remote bloccate per proteggere la tua privacy (pixel spia).","Imagens remotas bloqueadas para proteger a tua privacidade (píxeis de rastreio).","تم حظر الصور البعيدة لحماية خصوصيتك (بكسلات التتبّع)."],
"Afficher":["Show","Mostrar","Anzeigen","Mostra","Mostrar","عرض"],
"Toujours pour cet expéditeur":["Always for this sender","Siempre para este remitente","Immer für diesen Absender","Sempre per questo mittente","Sempre para este remetente","دائمًا لهذا المرسل"],
"Lettre d’information":["Newsletter","Boletín","Newsletter","Newsletter","Newsletter","نشرة إخبارية"],
"Se désabonner":["Unsubscribe","Darse de baja","Abbestellen","Annulla iscrizione","Cancelar subscrição","إلغاء الاشتراك"],
"(sans objet)":["(no subject)","(sin asunto)","(kein Betreff)","(nessun oggetto)","(sem assunto)","(بلا موضوع)"],
"(inconnu)":["(unknown)","(desconocido)","(unbekannt)","(sconosciuto)","(desconhecido)","(غير معروف)"],
"(sans destinataire)":["(no recipient)","(sin destinatario)","(kein Empfänger)","(nessun destinatario)","(sem destinatário)","(بلا مستلم)"],
"Brouillon":["Draft","Borrador","Entwurf","Bozza","Rascunho","مسودة"],
"À :":["To:","Para:","An:","A:","Para:","إلى:"],
"Cc :":["Cc:","Cc:","Cc:","Cc:","Cc:","نسخة:"],
"Aujourd’hui":["Today","Hoy","Heute","Oggi","Hoje","اليوم"],
"Hier":["Yesterday","Ayer","Gestern","Ieri","Ontem","أمس"],
"Cette semaine":["This week","Esta semana","Diese Woche","Questa settimana","Esta semana","هذا الأسبوع"],
"Ce mois-ci":["This month","Este mes","Diesen Monat","Questo mese","Este mês","هذا الشهر"],
"Charger plus de messages":["Load more messages","Cargar más mensajes","Weitere Nachrichten laden","Carica altri messaggi","Carregar mais mensagens","تحميل المزيد من الرسائل"],
"Aucun résultat":["No results","Sin resultados","Keine Ergebnisse","Nessun risultato","Sem resultados","لا توجد نتائج"],
"Essaie un autre mot, ou cherche « Partout ».":["Try another word, or search “Everywhere”.","Prueba otra palabra o busca «En todas partes».","Versuche ein anderes Wort oder suche „Überall“.","Prova un’altra parola o cerca «Ovunque».","Experimenta outra palavra ou pesquisa «Em todo o lado».","جرّب كلمة أخرى أو ابحث «في كل مكان»."],
"Rien ici":["Nothing here","Nada aquí","Hier ist nichts","Niente qui","Nada aqui","لا شيء هنا"],
"Aucun message ne correspond à ce filtre.":["No message matches this filter.","Ningún mensaje coincide con este filtro.","Keine Nachricht entspricht diesem Filter.","Nessun messaggio corrisponde a questo filtro.","Nenhuma mensagem corresponde a este filtro.","لا توجد رسالة تطابق هذا الفلتر."],
"Aucun message":["No messages","Ningún mensaje","Keine Nachrichten","Nessun messaggio","Nenhuma mensagem","لا توجد رسائل"],
"Ce dossier est vide.":["This folder is empty.","Esta carpeta está vacía.","Dieser Ordner ist leer.","Questa cartella è vuota.","Esta pasta está vazia.","هذا المجلد فارغ."],
"Nouveau dossier…":["New folder…","Nueva carpeta…","Neuer Ordner…","Nuova cartella…","Nova pasta…","مجلد جديد…"],
"Nouveau dossier":["New folder","Nueva carpeta","Neuer Ordner","Nuova cartella","Nova pasta","مجلد جديد"],
"Nouveau sous-dossier…":["New subfolder…","Nueva subcarpeta…","Neuer Unterordner…","Nuova sottocartella…","Nova subpasta…","مجلد فرعي جديد…"],
"Nom du dossier":["Folder name","Nombre de la carpeta","Ordnername","Nome della cartella","Nome da pasta","اسم المجلد"],
"Créer":["Create","Crear","Erstellen","Crea","Criar","إنشاء"],
"Dossier créé":["Folder created","Carpeta creada","Ordner erstellt","Cartella creata","Pasta criada","تم إنشاء المجلد"],
"Renommer…":["Rename…","Cambiar nombre…","Umbenennen…","Rinomina…","Mudar o nome…","إعادة تسمية…"],
"Renommer":["Rename","Cambiar nombre","Umbenennen","Rinomina","Mudar o nome","إعادة تسمية"],
"Renommer le dossier":["Rename folder","Cambiar nombre de la carpeta","Ordner umbenennen","Rinomina cartella","Mudar o nome da pasta","إعادة تسمية المجلد"],
"Nouveau nom":["New name","Nuevo nombre","Neuer Name","Nuovo nome","Novo nome","الاسم الجديد"],
"Supprimer le dossier":["Delete folder","Eliminar carpeta","Ordner löschen","Elimina cartella","Eliminar pasta","حذف المجلد"],
"Supprimer le dossier ?":["Delete folder?","¿Eliminar la carpeta?","Ordner löschen?","Eliminare la cartella?","Eliminar a pasta?","حذف المجلد؟"],
"Vider la corbeille":["Empty trash","Vaciar la papelera","Papierkorb leeren","Svuota il cestino","Esvaziar o lixo","إفراغ سلة المهملات"],
"Vider les indésirables":["Empty junk","Vaciar no deseados","Junk leeren","Svuota indesiderata","Esvaziar lixo eletrónico","إفراغ غير المرغوب فيه"],
"Vider":["Empty","Vaciar","Leeren","Svuota","Esvaziar","إفراغ"],
"Dossier vidé":["Folder emptied","Carpeta vaciada","Ordner geleert","Cartella svuotata","Pasta esvaziada","تم إفراغ المجلد"],
"Réglages du compte…":["Account settings…","Ajustes de la cuenta…","Kontoeinstellungen…","Impostazioni account…","Definições da conta…","إعدادات الحساب…"],
"Annuler":["Cancel","Cancelar","Abbrechen","Annulla","Cancelar","إلغاء"],
"Confirmer":["Confirm","Confirmar","Bestätigen","Conferma","Confirmar","تأكيد"],
"OK":["OK","Aceptar","OK","OK","OK","موافق"],
"Restauré":["Restored","Restaurado","Wiederhergestellt","Ripristinato","Restaurado","تمت الاستعادة"],
"Supprimer définitivement ?":["Delete permanently?","¿Eliminar definitivamente?","Endgültig löschen?","Eliminare definitivamente?","Eliminar definitivamente?","حذف نهائي؟"],
"Déplacer : choisis des messages d’un seul compte":["Move: pick messages from a single account","Mover: elige mensajes de una sola cuenta","Verschieben: wähle Nachrichten aus nur einem Konto","Sposta: scegli messaggi di un solo account","Mover: escolhe mensagens de uma só conta","النقل: اختر رسائل من حساب واحد فقط"],
"Écris ton message…":["Write your message…","Escribe tu mensaje…","Schreibe deine Nachricht…","Scrivi il tuo messaggio…","Escreve a tua mensagem…","اكتب رسالتك…"],
"Objet du message":["Subject","Asunto del mensaje","Betreff","Oggetto del messaggio","Assunto da mensagem","موضوع الرسالة"],
"Objet":["Subject","Asunto","Betreff","Oggetto","Assunto","الموضوع"],
"De":["From","De","Von","Da","De","من"],
"À":["To","Para","An","A","Para","إلى"],
"Cc":["Cc","Cc","Cc","Cc","Cc","نسخة"],
"Cci":["Bcc","Cco","Bcc","Ccn","Bcc","نسخة مخفية"],
"Cc / Cci":["Cc / Bcc","Cc / Cco","Cc / Bcc","Cc / Ccn","Cc / Bcc","نسخة / مخفية"],
"Réduire":["Minimize","Minimizar","Minimieren","Riduci","Minimizar","تصغير"],
"Agrandir":["Maximize","Maximizar","Maximieren","Ingrandisci","Maximizar","تكبير"],
"Fermer (le brouillon est enregistré)":["Close (draft is saved)","Cerrar (el borrador se guarda)","Schließen (Entwurf wird gespeichert)","Chiudi (la bozza viene salvata)","Fechar (o rascunho é guardado)","إغلاق (يتم حفظ المسودة)"],
"Police":["Font","Fuente","Schrift","Carattere","Tipo de letra","الخط"],
"Taille":["Size","Tamaño","Größe","Dimensione","Tamanho","الحجم"],
"Petit":["Small","Pequeño","Klein","Piccolo","Pequeno","صغير"],
"Normal":["Normal","Normal","Normal","Normale","Normal","عادي"],
"Grand":["Large","Grande","Groß","Grande","Grande","كبير"],
"Très grand":["Very large","Muy grande","Sehr groß","Molto grande","Muito grande","كبير جدًا"],
"Gras (Ctrl B)":["Bold (Ctrl B)","Negrita (Ctrl B)","Fett (Strg B)","Grassetto (Ctrl B)","Negrito (Ctrl B)","غامق (Ctrl B)"],
"Italique (Ctrl I)":["Italic (Ctrl I)","Cursiva (Ctrl I)","Kursiv (Strg I)","Corsivo (Ctrl I)","Itálico (Ctrl I)","مائل (Ctrl I)"],
"Souligné (Ctrl U)":["Underline (Ctrl U)","Subrayado (Ctrl U)","Unterstrichen (Strg U)","Sottolineato (Ctrl U)","Sublinhado (Ctrl U)","تسطير (Ctrl U)"],
"Barré":["Strikethrough","Tachado","Durchgestrichen","Barrato","Rasurado","يتوسطه خط"],
"Couleur du texte":["Text color","Color del texto","Textfarbe","Colore del testo","Cor do texto","لون النص"],
"Liste à puces":["Bulleted list","Lista con viñetas","Aufzählung","Elenco puntato","Lista com marcas","قائمة نقطية"],
"Liste numérotée":["Numbered list","Lista numerada","Nummerierte Liste","Elenco numerato","Lista numerada","قائمة مرقّمة"],
"Citation":["Quote","Cita","Zitat","Citazione","Citação","اقتباس"],
"Insérer un lien (Ctrl K)":["Insert link (Ctrl K)","Insertar enlace (Ctrl K)","Link einfügen (Strg K)","Inserisci link (Ctrl K)","Inserir ligação (Ctrl K)","إدراج رابط (Ctrl K)"],
"Insérer un lien":["Insert link","Insertar enlace","Link einfügen","Inserisci link","Inserir ligação","إدراج رابط"],
"Adresse du lien (https://…)":["Link address (https://…)","Dirección del enlace (https://…)","Linkadresse (https://…)","Indirizzo del link (https://…)","Endereço da ligação (https://…)","عنوان الرابط (https://…)"],
"Insérer":["Insert","Insertar","Einfügen","Inserisci","Inserir","إدراج"],
"Insérer une image":["Insert image","Insertar imagen","Bild einfügen","Inserisci immagine","Inserir imagem","إدراج صورة"],
"Effacer la mise en forme":["Clear formatting","Borrar formato","Formatierung entfernen","Cancella formattazione","Limpar formatação","مسح التنسيق"],
"Insérer la signature":["Insert signature","Insertar firma","Signatur einfügen","Inserisci firma","Inserir assinatura","إدراج التوقيع"],
"Envoyer":["Send","Enviar","Senden","Invia","Enviar","إرسال"],
"Envoyer (Ctrl Entrée)":["Send (Ctrl Enter)","Enviar (Ctrl Intro)","Senden (Strg Enter)","Invia (Ctrl Invio)","Enviar (Ctrl Enter)","إرسال (Ctrl Enter)"],
"Réponse":["Reply","Respuesta","Antwort","Risposta","Resposta","رد"],
"Réponse à tous":["Reply all","Responder a todos","Allen antworten","Rispondi a tutti","Responder a todos","رد على الكل"],
"Transfert":["Forward","Reenvío","Weiterleitung","Inoltro","Reencaminhamento","إعادة توجيه"],
"Correcteur orthographique":["Spell checker","Corrector ortográfico","Rechtschreibprüfung","Correttore ortografico","Corretor ortográfico","المدقق الإملائي"],
"Désactivé":["Off","Desactivado","Aus","Disattivato","Desativado","معطّل"],
"Automatique (langue de l’appli)":["Automatic (app language)","Automático (idioma de la app)","Automatisch (App-Sprache)","Automatico (lingua dell’app)","Automático (idioma da app)","تلقائي (لغة التطبيق)"],
"Automatique":["Automatic","Automático","Automatisch","Automatico","Automático","تلقائي"],
"Joindre":["Attach","Adjuntar","Anhängen","Allega","Anexar","إرفاق"],
"Joindre des fichiers":["Attach files","Adjuntar archivos","Dateien anhängen","Allega file","Anexar ficheiros","إرفاق ملفات"],
"Supprimer le brouillon":["Discard draft","Descartar borrador","Entwurf verwerfen","Elimina bozza","Eliminar rascunho","حذف المسودة"],
"Supprimer ce brouillon ?":["Discard this draft?","¿Descartar este borrador?","Diesen Entwurf verwerfen?","Eliminare questa bozza?","Eliminar este rascunho?","حذف هذه المسودة؟"],
"Le message en cours sera perdu.":["The current message will be lost.","El mensaje en curso se perderá.","Die aktuelle Nachricht geht verloren.","Il messaggio in corso andrà perso.","A mensagem em curso será perdida.","ستفقد الرسالة الحالية."],
"Retirer":["Remove","Quitar","Entfernen","Rimuovi","Remover","إزالة"],
"Un message est déjà en cours":["A message is already in progress","Ya hay un mensaje en curso","Es wird bereits eine Nachricht verfasst","C’è già un messaggio in corso","Já há uma mensagem em curso","هناك رسالة قيد الكتابة بالفعل"],
"Enregistrer le brouillon actuel et en commencer un nouveau ?":["Save the current draft and start a new one?","¿Guardar el borrador actual y empezar uno nuevo?","Aktuellen Entwurf speichern und einen neuen beginnen?","Salvare la bozza attuale e iniziarne una nuova?","Guardar o rascunho atual e começar um novo?","حفظ المسودة الحالية وبدء رسالة جديدة؟"],
"Enregistrer et continuer":["Save and continue","Guardar y continuar","Speichern und fortfahren","Salva e continua","Guardar e continuar","حفظ ومتابعة"],
"Enregistré sur cet ordinateur":["Saved on this computer","Guardado en este ordenador","Auf diesem Computer gespeichert","Salvato su questo computer","Guardado neste computador","تم الحفظ على هذا الحاسوب"],
"Envoyer sans objet ?":["Send without a subject?","¿Enviar sin asunto?","Ohne Betreff senden?","Inviare senza oggetto?","Enviar sem assunto?","إرسال بدون موضوع؟"],
"Ton message n’a pas d’objet.":["Your message has no subject.","Tu mensaje no tiene asunto.","Deine Nachricht hat keinen Betreff.","Il tuo messaggio non ha oggetto.","A tua mensagem não tem assunto.","رسالتك بدون موضوع."],
"Envoyer quand même":["Send anyway","Enviar de todos modos","Trotzdem senden","Invia comunque","Enviar mesmo assim","إرسال على أي حال"],
"Pièce jointe oubliée ?":["Forgot an attachment?","¿Olvidaste un adjunto?","Anhang vergessen?","Allegato dimenticato?","Esqueceste um anexo?","هل نسيت مرفقًا؟"],
"Ton message parle d’une pièce jointe, mais aucune n’est jointe.":["Your message mentions an attachment, but none is attached.","Tu mensaje menciona un adjunto, pero no hay ninguno.","Deine Nachricht erwähnt einen Anhang, aber es ist keiner angehängt.","Il tuo messaggio parla di un allegato, ma non ce n’è nessuno.","A tua mensagem fala de um anexo, mas não há nenhum.","تذكر رسالتك مرفقًا، لكن لا يوجد أي مرفق."],
"Ajoute au moins un destinataire":["Add at least one recipient","Añade al menos un destinatario","Füge mindestens einen Empfänger hinzu","Aggiungi almeno un destinatario","Adiciona pelo menos um destinatário","أضف مستلمًا واحدًا على الأقل"],
"Ajoute au moins un destinataire.":["Add at least one recipient.","Añade al menos un destinatario.","Füge mindestens einen Empfänger hinzu.","Aggiungi almeno un destinatario.","Adiciona pelo menos um destinatário.","أضف مستلمًا واحدًا على الأقل."],
"Envoi en cours…":["Sending…","Enviando…","Wird gesendet…","Invio in corso…","A enviar…","جارٍ الإرسال…"],
"Message envoyé":["Message sent","Mensaje enviado","Nachricht gesendet","Messaggio inviato","Mensagem enviada","تم إرسال الرسالة"],
"Rouvrir":["Reopen","Reabrir","Wieder öffnen","Riapri","Reabrir","إعادة الفتح"],
"Envoi annulé":["Sending canceled","Envío cancelado","Senden abgebrochen","Invio annullato","Envio cancelado","تم إلغاء الإرسال"],
"Brouillon enregistré":["Draft saved","Borrador guardado","Entwurf gespeichert","Bozza salvata","Rascunho guardado","تم حفظ المسودة"],
"Un message non envoyé a été récupéré":["An unsent message was recovered","Se ha recuperado un mensaje no enviado","Eine nicht gesendete Nachricht wurde wiederhergestellt","È stato recuperato un messaggio non inviato","Foi recuperada uma mensagem não enviada","تم استرجاع رسالة غير مرسلة"],
"Aucune signature : ajoute-la dans Réglages → Comptes":["No signature: add one in Settings → Accounts","Sin firma: añádela en Ajustes → Cuentas","Keine Signatur: füge sie unter Einstellungen → Konten hinzu","Nessuna firma: aggiungila in Impostazioni → Account","Sem assinatura: adiciona-a em Definições → Contas","لا يوجد توقيع: أضفه من الإعدادات ← الحسابات"],
"Pièces jointes > 25 Mo : certains serveurs refuseront le message":["Attachments > 25 MB: some servers will reject the message","Adjuntos > 25 MB: algunos servidores rechazarán el mensaje","Anhänge > 25 MB: manche Server lehnen die Nachricht ab","Allegati > 25 MB: alcuni server rifiuteranno il messaggio","Anexos > 25 MB: alguns servidores vão recusar a mensagem","المرفقات > 25 ميغابايت: قد ترفض بعض الخوادم الرسالة"],
"Message transféré":["Forwarded message","Mensaje reenviado","Weitergeleitete Nachricht","Messaggio inoltrato","Mensagem reencaminhada","رسالة معاد توجيهها"],
"Choisis ton fournisseur de messagerie.":["Choose your email provider.","Elige tu proveedor de correo.","Wähle deinen E-Mail-Anbieter.","Scegli il tuo provider di posta.","Escolhe o teu fornecedor de email.","اختر مزوّد بريدك الإلكتروني."],
"Autre…":["Other…","Otro…","Andere…","Altro…","Outro…","آخر…"],
"Autre messagerie":["Other email","Otro correo","Anderer Anbieter","Altra posta","Outro email","بريد آخر"],
"Saisis ton adresse : Hamama trouve tout seul les réglages des serveurs.":["Enter your address: Hamama finds the server settings by itself.","Escribe tu dirección: Hamama encuentra solo los ajustes del servidor.","Gib deine Adresse ein: Hamama findet die Servereinstellungen selbst.","Inserisci il tuo indirizzo: Hamama trova da solo le impostazioni del server.","Escreve o teu endereço: o Hamama encontra sozinho as definições do servidor.","أدخل عنوانك: يعثر حمامة على إعدادات الخادم تلقائيًا."],
"Ouvrir la page ↗":["Open page ↗","Abrir la página ↗","Seite öffnen ↗","Apri la pagina ↗","Abrir a página ↗","فتح الصفحة ↗"],
"Ton nom (affiché aux destinataires)":["Your name (shown to recipients)","Tu nombre (visible para los destinatarios)","Dein Name (für Empfänger sichtbar)","Il tuo nome (visibile ai destinatari)","O teu nome (visível para os destinatários)","اسمك (يظهر للمستلمين)"],
"Adresse e-mail":["Email address","Dirección de correo","E-Mail-Adresse","Indirizzo email","Endereço de email","عنوان البريد الإلكتروني"],
"Mot de passe":["Password","Contraseña","Passwort","Password","Palavra-passe","كلمة المرور"],
"Mot de passe d’application":["App password","Contraseña de aplicación","App-Passwort","Password per le app","Palavra-passe de aplicação","كلمة مرور التطبيق"],
"Réglages avancés (serveurs)":["Advanced settings (servers)","Ajustes avanzados (servidores)","Erweiterte Einstellungen (Server)","Impostazioni avanzate (server)","Definições avançadas (servidores)","إعدادات متقدمة (الخوادم)"],
"Identifiant (si différent de l’adresse)":["Username (if different from the address)","Usuario (si es distinto de la dirección)","Benutzername (falls abweichend von der Adresse)","Nome utente (se diverso dall’indirizzo)","Utilizador (se diferente do endereço)","اسم المستخدم (إن كان مختلفًا عن العنوان)"],
"Serveur de réception IMAP":["Incoming server IMAP","Servidor entrante IMAP","Posteingangsserver IMAP","Server in entrata IMAP","Servidor de receção IMAP","خادم الاستقبال IMAP"],
"Serveur d’envoi SMTP":["Outgoing server SMTP","Servidor saliente SMTP","Postausgangsserver SMTP","Server in uscita SMTP","Servidor de envio SMTP","خادم الإرسال SMTP"],
"Sécurité":["Security","Seguridad","Sicherheit","Sicurezza","Segurança","الأمان"],
"Accepter un certificat non vérifié (serveur local uniquement)":["Accept an unverified certificate (local server only)","Aceptar un certificado no verificado (solo servidor local)","Nicht geprüftes Zertifikat akzeptieren (nur lokaler Server)","Accetta un certificato non verificato (solo server locale)","Aceitar um certificado não verificado (só servidor local)","قبول شهادة غير موثّقة (للخادم المحلي فقط)"],
"Retour":["Back","Atrás","Zurück","Indietro","Voltar","رجوع"],
"Se connecter":["Sign in","Conectar","Anmelden","Accedi","Iniciar sessão","تسجيل الدخول"],
"Connexion…":["Connecting…","Conectando…","Verbinde…","Connessione…","A ligar…","جارٍ الاتصال…"],
"Recherche des réglages…":["Looking up settings…","Buscando ajustes…","Einstellungen werden gesucht…","Ricerca impostazioni…","A procurar definições…","جارٍ البحث عن الإعدادات…"],
"Fournisseur reconnu":["Provider recognized","Proveedor reconocido","Anbieter erkannt","Provider riconosciuto","Fornecedor reconhecido","تم التعرّف على المزوّد"],
"Réglages trouvés (base Mozilla)":["Settings found (Mozilla database)","Ajustes encontrados (base de Mozilla)","Einstellungen gefunden (Mozilla-Datenbank)","Impostazioni trovate (database Mozilla)","Definições encontradas (base Mozilla)","تم العثور على الإعدادات (قاعدة Mozilla)"],
"Réglages trouvés via le domaine":["Settings found via the domain","Ajustes encontrados mediante el dominio","Einstellungen über die Domain gefunden","Impostazioni trovate tramite il dominio","Definições encontradas através do domínio","تم العثور على الإعدادات عبر النطاق"],
"Réglages supposés : vérifie-les si la connexion échoue":["Guessed settings: check them if the connection fails","Ajustes supuestos: revísalos si falla la conexión","Vermutete Einstellungen: prüfe sie, falls die Verbindung fehlschlägt","Impostazioni presunte: verificale se la connessione fallisce","Definições presumidas: verifica-as se a ligação falhar","إعدادات مفترضة: تحقّق منها إذا فشل الاتصال"],
"Adresse e-mail invalide.":["Invalid email address.","Dirección de correo no válida.","Ungültige E-Mail-Adresse.","Indirizzo email non valido.","Endereço de email inválido.","عنوان بريد إلكتروني غير صالح."],
"Saisis le mot de passe.":["Enter the password.","Escribe la contraseña.","Gib das Passwort ein.","Inserisci la password.","Escreve a palavra-passe.","أدخل كلمة المرور."],
"Ce compte est déjà dans Hamama.":["This account is already in Hamama.","Esta cuenta ya está en Hamama.","Dieses Konto ist bereits in Hamama.","Questo account è già in Hamama.","Esta conta já está no Hamama.","هذا الحساب موجود بالفعل في حمامة."],
"Réception (IMAP) :":["Incoming (IMAP):","Recepción (IMAP):","Empfang (IMAP):","Ricezione (IMAP):","Receção (IMAP):","الاستقبال (IMAP):"],
"Envoi (SMTP) :":["Sending (SMTP):","Envío (SMTP):","Versand (SMTP):","Invio (SMTP):","Envio (SMTP):","الإرسال (SMTP):"],
"ou avec un mot de passe d’application :":["or with an app password:","o con una contraseña de aplicación:","oder mit einem App-Passwort:","oppure con una password per le app:","ou com uma palavra-passe de aplicação:","أو باستخدام كلمة مرور التطبيق:"],
"Une page de connexion s’ouvre dans ton navigateur…":["A sign-in page is opening in your browser…","Se abre una página de inicio de sesión en tu navegador…","Eine Anmeldeseite öffnet sich in deinem Browser…","Si apre una pagina di accesso nel browser…","Abre-se uma página de início de sessão no teu navegador…","تُفتح صفحة تسجيل الدخول في متصفحك…"],
"Vérification…":["Checking…","Verificando…","Wird geprüft…","Verifica…","A verificar…","جارٍ التحقق…"],
"Gmail exige un mot de passe d’application (16 lettres) : active la validation en deux étapes, puis crée-le ici :":["Gmail requires an app password (16 letters): turn on 2-Step Verification, then create it here:","Gmail exige una contraseña de aplicación (16 letras): activa la verificación en dos pasos y créala aquí:","Gmail verlangt ein App-Passwort (16 Buchstaben): aktiviere die Bestätigung in zwei Schritten und erstelle es hier:","Gmail richiede una password per le app (16 lettere): attiva la verifica in due passaggi, poi creala qui:","O Gmail exige uma palavra-passe de aplicação (16 letras): ativa a verificação em dois passos e cria-a aqui:","يتطلب Gmail كلمة مرور تطبيق (16 حرفًا): فعّل التحقق بخطوتين ثم أنشئها هنا:"],
"iCloud exige un mot de passe pour app : compte Apple → Connexion et sécurité → Mots de passe pour app.":["iCloud requires an app-specific password: Apple Account → Sign-In and Security → App-Specific Passwords.","iCloud exige una contraseña de app: cuenta de Apple → Inicio de sesión y seguridad → Contraseñas de apps.","iCloud verlangt ein App-spezifisches Passwort: Apple Account → Anmeldung und Sicherheit → App-spezifische Passwörter.","iCloud richiede una password per app: account Apple → Accesso e sicurezza → Password specifiche per le app.","O iCloud exige uma palavra-passe para apps: conta Apple → Início de sessão e segurança → Palavras-passe para apps.","يتطلب iCloud كلمة مرور خاصة بالتطبيق: حساب Apple ← تسجيل الدخول والأمان ← كلمات مرور التطبيقات."],
"Yahoo exige un mot de passe d’application : Sécurité du compte → Générer un mot de passe d’application.":["Yahoo requires an app password: Account security → Generate app password.","Yahoo exige una contraseña de aplicación: Seguridad de la cuenta → Generar contraseña de aplicación.","Yahoo verlangt ein App-Passwort: Kontosicherheit → App-Passwort generieren.","Yahoo richiede una password per le app: Sicurezza account → Genera password per app.","O Yahoo exige uma palavra-passe de aplicação: Segurança da conta → Gerar palavra-passe de aplicação.","يتطلب Yahoo كلمة مرور تطبيق: أمان الحساب ← إنشاء كلمة مرور التطبيق."],
"Microsoft impose la connexion sécurisée « OAuth » pour Outlook / Hotmail.":["Microsoft requires secure “OAuth” sign-in for Outlook / Hotmail.","Microsoft exige el inicio de sesión seguro «OAuth» para Outlook / Hotmail.","Microsoft verlangt die sichere „OAuth“-Anmeldung für Outlook / Hotmail.","Microsoft impone l’accesso sicuro «OAuth» per Outlook / Hotmail.","A Microsoft exige o início de sessão seguro «OAuth» para Outlook / Hotmail.","تفرض Microsoft تسجيل الدخول الآمن «OAuth» لـ Outlook / Hotmail."],
"Utilise le mot de passe de ta messagerie Orange.":["Use your Orange mailbox password.","Usa la contraseña de tu correo Orange.","Verwende das Passwort deines Orange-Postfachs.","Usa la password della tua posta Orange.","Usa a palavra-passe do teu email Orange.","استخدم كلمة مرور بريد Orange."],
"Utilise le mot de passe de ta boîte Free (zimbra).":["Use your Free mailbox password (zimbra).","Usa la contraseña de tu buzón Free (zimbra).","Verwende das Passwort deines Free-Postfachs (zimbra).","Usa la password della tua casella Free (zimbra).","Usa a palavra-passe da tua caixa Free (zimbra).","استخدم كلمة مرور صندوق Free (zimbra)."],
"Utilise le mot de passe de ta messagerie SFR.":["Use your SFR mailbox password.","Usa la contraseña de tu correo SFR.","Verwende das Passwort deines SFR-Postfachs.","Usa la password della tua posta SFR.","Usa a palavra-passe do teu email SFR.","استخدم كلمة مرور بريد SFR."],
"Utilise le mot de passe de ta boîte La Poste.":["Use your La Poste mailbox password.","Usa la contraseña de tu buzón La Poste.","Verwende das Passwort deines La-Poste-Postfachs.","Usa la password della tua casella La Poste.","Usa a palavra-passe da tua caixa La Poste.","استخدم كلمة مرور صندوق La Poste."],
"Active d’abord l’accès IMAP dans les réglages GMX.":["First enable IMAP access in your GMX settings.","Activa primero el acceso IMAP en los ajustes de GMX.","Aktiviere zuerst den IMAP-Zugriff in den GMX-Einstellungen.","Attiva prima l’accesso IMAP nelle impostazioni GMX.","Ativa primeiro o acesso IMAP nas definições do GMX.","فعّل أولًا الوصول عبر IMAP في إعدادات GMX."],
"Utilise le mot de passe de ton adresse OVH.":["Use your OVH address password.","Usa la contraseña de tu dirección OVH.","Verwende das Passwort deiner OVH-Adresse.","Usa la password del tuo indirizzo OVH.","Usa a palavra-passe do teu endereço OVH.","استخدم كلمة مرور عنوان OVH."],
"La connexion Microsoft n’est pas encore activée dans cette version de Hamama. Les comptes Outlook.com / Hotmail ne peuvent pas encore être ajoutés (les comptes Microsoft 365 d’entreprise avec IMAP autorisé peuvent fonctionner).":["Microsoft sign-in isn’t enabled in this version of Hamama yet. Outlook.com / Hotmail accounts can’t be added yet (business Microsoft 365 accounts with IMAP allowed may work).","El inicio de sesión de Microsoft aún no está activado en esta versión de Hamama. Las cuentas Outlook.com / Hotmail aún no se pueden añadir (las cuentas Microsoft 365 de empresa con IMAP permitido pueden funcionar).","Die Microsoft-Anmeldung ist in dieser Hamama-Version noch nicht aktiv. Outlook.com-/Hotmail-Konten können noch nicht hinzugefügt werden (Microsoft-365-Firmenkonten mit erlaubtem IMAP können funktionieren).","L’accesso Microsoft non è ancora attivo in questa versione di Hamama. Gli account Outlook.com / Hotmail non possono ancora essere aggiunti (gli account aziendali Microsoft 365 con IMAP consentito possono funzionare).","O início de sessão Microsoft ainda não está ativo nesta versão do Hamama. As contas Outlook.com / Hotmail ainda não podem ser adicionadas (as contas empresariais Microsoft 365 com IMAP permitido podem funcionar).","تسجيل الدخول عبر Microsoft غير مفعّل بعد في هذا الإصدار من حمامة. لا يمكن إضافة حسابات Outlook.com / Hotmail حاليًا (قد تعمل حسابات Microsoft 365 للشركات التي تسمح بـ IMAP)."],
"Réglages de ce compte":["Settings for this account","Ajustes de esta cuenta","Einstellungen dieses Kontos","Impostazioni di questo account","Definições desta conta","إعدادات هذا الحساب"],
"Nom affiché aux destinataires":["Name shown to recipients","Nombre visible para los destinatarios","Für Empfänger angezeigter Name","Nome visibile ai destinatari","Nome visível para os destinatários","الاسم الظاهر للمستلمين"],
"Nom du compte dans Hamama":["Account name in Hamama","Nombre de la cuenta en Hamama","Kontoname in Hamama","Nome dell’account in Hamama","Nome da conta no Hamama","اسم الحساب في حمامة"],
"Couleur":["Color","Color","Farbe","Colore","Cor","اللون"],
"Signature":["Signature","Firma","Signatur","Firma","Assinatura","التوقيع"],
"Copier les messages envoyés dans « Envoyés » (à décocher pour Gmail / Outlook)":["Copy sent messages to “Sent” (uncheck for Gmail / Outlook)","Copiar los mensajes enviados en «Enviados» (desmarcar para Gmail / Outlook)","Gesendete Nachrichten in „Gesendet“ kopieren (für Gmail / Outlook deaktivieren)","Copia i messaggi inviati in «Inviati» (deseleziona per Gmail / Outlook)","Copiar as mensagens enviadas para «Enviados» (desmarcar para Gmail / Outlook)","نسخ الرسائل المرسلة إلى «المرسلة» (ألغِ التحديد لـ Gmail / Outlook)"],
"Mot de passe et serveurs":["Password and servers","Contraseña y servidores","Passwort und Server","Password e server","Palavra-passe e servidores","كلمة المرور والخوادم"],
"Nouveau mot de passe":["New password","Nueva contraseña","Neues Passwort","Nuova password","Nova palavra-passe","كلمة مرور جديدة"],
"Laisser vide pour ne pas changer":["Leave empty to keep it","Déjalo vacío para no cambiarla","Leer lassen, um es nicht zu ändern","Lascia vuoto per non cambiarla","Deixar vazio para não alterar","اتركه فارغًا لعدم التغيير"],
"Retirer le compte":["Remove account","Quitar la cuenta","Konto entfernen","Rimuovi account","Remover conta","إزالة الحساب"],
"Retirer ce compte de Hamama ?":["Remove this account from Hamama?","¿Quitar esta cuenta de Hamama?","Dieses Konto aus Hamama entfernen?","Rimuovere questo account da Hamama?","Remover esta conta do Hamama?","إزالة هذا الحساب من حمامة؟"],
"Compte retiré":["Account removed","Cuenta quitada","Konto entfernt","Account rimosso","Conta removida","تمت إزالة الحساب"],
"Compte enregistré":["Account saved","Cuenta guardada","Konto gespeichert","Account salvato","Conta guardada","تم حفظ الحساب"],
"Modifier":["Edit","Editar","Bearbeiten","Modifica","Editar","تعديل"],
"Les mots de passe sont chiffrés par Windows sur cet ordinateur et ne sont jamais envoyés ailleurs qu’à ton fournisseur.":["Passwords are encrypted by Windows on this computer and are never sent anywhere except to your provider.","Las contraseñas las cifra Windows en este ordenador y solo se envían a tu proveedor.","Passwörter werden von Windows auf diesem Computer verschlüsselt und nur an deinen Anbieter gesendet.","Le password sono cifrate da Windows su questo computer e vengono inviate solo al tuo provider.","As palavras-passe são encriptadas pelo Windows neste computador e só são enviadas ao teu fornecedor.","يشفّر Windows كلمات المرور على هذا الحاسوب ولا تُرسل إلا إلى مزوّدك."],
"Les changements s’appliquent tout de suite et sont mémorisés.":["Changes apply right away and are remembered.","Los cambios se aplican al instante y se guardan.","Änderungen gelten sofort und werden gespeichert.","Le modifiche si applicano subito e vengono memorizzate.","As alterações aplicam-se de imediato e ficam guardadas.","تُطبّق التغييرات فورًا ويتم حفظها."],
"Apparence":["Appearance","Apariencia","Darstellung","Aspetto","Aspeto","المظهر"],
"Liste":["List","Lista","Liste","Elenco","Lista","القائمة"],
"Lecture":["Reading","Lectura","Lesen","Lettura","Leitura","القراءة"],
"Rédaction":["Writing","Redacción","Verfassen","Scrittura","Escrita","الكتابة"],
"Comptes":["Accounts","Cuentas","Konten","Account","Contas","الحسابات"],
"Notifications":["Notifications","Notificaciones","Benachrichtigungen","Notifiche","Notificações","الإشعارات"],
"Raccourcis":["Shortcuts","Atajos","Kurzbefehle","Scorciatoie","Atalhos","الاختصارات"],
"À propos":["About","Acerca de","Über","Informazioni","Sobre","حول"],
"Langue":["Language","Idioma","Sprache","Lingua","Idioma","اللغة"],
"Langue de l’application":["App language","Idioma de la aplicación","App-Sprache","Lingua dell’app","Idioma da aplicação","لغة التطبيق"],
"Automatique (langue de Windows)":["Automatic (Windows language)","Automático (idioma de Windows)","Automatisch (Windows-Sprache)","Automatica (lingua di Windows)","Automático (idioma do Windows)","تلقائي (لغة Windows)"],
"Hamama redémarre son interface pour appliquer la langue.":["Hamama reloads its interface to apply the language.","Hamama recarga su interfaz para aplicar el idioma.","Hamama lädt die Oberfläche neu, um die Sprache anzuwenden.","Hamama ricarica l’interfaccia per applicare la lingua.","O Hamama recarrega a interface para aplicar o idioma.","يعيد حمامة تحميل واجهته لتطبيق اللغة."],
"Réinitialiser l’apparence":["Reset appearance","Restablecer apariencia","Darstellung zurücksetzen","Ripristina aspetto","Repor aspeto","إعادة ضبط المظهر"],
"Terminé":["Done","Hecho","Fertig","Fatto","Concluído","تم"],
"Thème":["Theme","Tema","Design","Tema","Tema","السمة"],
"Graphite":["Graphite","Grafito","Graphit","Grafite","Grafite","جرافيت"],
"Sombre":["Dark","Oscuro","Dunkel","Scuro","Escuro","داكن"],
"Noir OLED":["OLED black","Negro OLED","OLED-Schwarz","Nero OLED","Preto OLED","أسود OLED"],
"Clair":["Light","Claro","Hell","Chiaro","Claro","فاتح"],
"Police de l’interface":["Interface font","Fuente de la interfaz","Schrift der Oberfläche","Carattere dell’interfaccia","Tipo de letra da interface","خط الواجهة"],
"Texte en gras":["Bold text","Texto en negrita","Fettschrift","Testo in grassetto","Texto em negrito","النص الغامق"],
"Gras":["Bold","Negrita","Fett","Grassetto","Negrito","غامق"],
"Demi-gras":["Semi-bold","Seminegrita","Halbfett","Semigrassetto","Seminegrito","شبه غامق"],
"Sans gras":["No bold","Sin negrita","Ohne Fett","Senza grassetto","Sem negrito","بدون غامق"],
"S’applique aux titres, noms et boutons. Le texte que tu mets en gras dans tes messages n’est pas touché.":["Applies to titles, names and buttons. Text you make bold in your messages isn’t affected.","Se aplica a títulos, nombres y botones. El texto que pones en negrita en tus mensajes no cambia.","Gilt für Titel, Namen und Schaltflächen. Fett formatierter Text in deinen Nachrichten bleibt unverändert.","Si applica a titoli, nomi e pulsanti. Il testo in grassetto nei tuoi messaggi non viene toccato.","Aplica-se a títulos, nomes e botões. O texto que pões em negrito nas tuas mensagens não é alterado.","يُطبّق على العناوين والأسماء والأزرار. لا يتأثر النص الغامق في رسائلك."],
"Messages non lus en gras":["Unread messages in bold","Mensajes no leídos en negrita","Ungelesene Nachrichten fett","Messaggi non letti in grassetto","Mensagens não lidas em negrito","الرسائل غير المقروءة بالغامق"],
"Si « Non », les non-lus restent signalés par le point de couleur.":["If “No”, unread messages are still marked by the colored dot.","Si «No», los no leídos siguen marcados con el punto de color.","Bei „Nein“ bleiben ungelesene Nachrichten durch den farbigen Punkt markiert.","Se «No», i non letti restano segnalati dal punto colorato.","Se «Não», as não lidas continuam assinaladas pelo ponto colorido.","عند اختيار «لا» تبقى الرسائل غير المقروءة مميّزة بالنقطة الملوّنة."],
"Couleur d’accent":["Accent color","Color de acento","Akzentfarbe","Colore di accento","Cor de destaque","لون التمييز"],
"Couleur personnalisée":["Custom color","Color personalizado","Eigene Farbe","Colore personalizzato","Cor personalizada","لون مخصّص"],
"Disposition":["Layout","Diseño","Layout","Layout","Disposição","التخطيط"],
"3 colonnes":["3 columns","3 columnas","3 Spalten","3 colonne","3 colunas","3 أعمدة"],
"Lecture en dessous":["Reading below","Lectura debajo","Lesen unten","Lettura sotto","Leitura em baixo","القراءة في الأسفل"],
"Focus":["Focus","Enfoque","Fokus","Focus","Foco","تركيز"],
"« Focus » : la liste prend toute la place, le message s’ouvre en grand.":["“Focus”: the list fills the window, messages open full size.","«Enfoque»: la lista ocupa todo y el mensaje se abre en grande.","„Fokus“: Die Liste füllt das Fenster, Nachrichten öffnen sich groß.","«Focus»: l’elenco occupa tutto, il messaggio si apre a tutta finestra.","«Foco»: a lista ocupa tudo e a mensagem abre em grande.","«تركيز»: تملأ القائمة النافذة وتُفتح الرسالة بحجم كبير."],
"Densité":["Density","Densidad","Dichte","Densità","Densidade","الكثافة"],
"Compacte":["Compact","Compacta","Kompakt","Compatta","Compacta","مضغوطة"],
"Confortable":["Comfortable","Cómoda","Komfortabel","Comoda","Confortável","مريحة"],
"Taille de l’interface":["Interface size","Tamaño de la interfaz","Größe der Oberfläche","Dimensione dell’interfaccia","Tamanho da interface","حجم الواجهة"],
"Petite":["Small","Pequeña","Klein","Piccola","Pequena","صغير"],
"Moyenne":["Medium","Mediana","Mittel","Media","Média","متوسط"],
"Grande":["Large","Grande","Groß","Grande","Grande","كبير"],
"Très grande":["Very large","Muy grande","Sehr groß","Molto grande","Muito grande","كبير جدًا"],
"Coins":["Corners","Esquinas","Ecken","Angoli","Cantos","الزوايا"],
"Carrés":["Square","Cuadradas","Eckig","Squadrati","Quadrados","مربعة"],
"Doux":["Soft","Suaves","Weich","Morbidi","Suaves","ناعمة"],
"Ronds":["Round","Redondas","Rund","Arrotondati","Redondos","مستديرة"],
"Barre des dossiers":["Folder bar","Barra de carpetas","Ordnerleiste","Barra delle cartelle","Barra de pastas","شريط المجلدات"],
"Visible":["Visible","Visible","Sichtbar","Visibile","Visível","ظاهر"],
"Masquée":["Hidden","Oculta","Ausgeblendet","Nascosta","Oculta","مخفي"],
"Aperçu du texte":["Text preview","Vista previa del texto","Textvorschau","Anteprima del testo","Pré-visualização do texto","معاينة النص"],
"Aucun":["None","Ninguno","Keine","Nessuno","Nenhum","بدون"],
"1 ligne":["1 line","1 línea","1 Zeile","1 riga","1 linha","سطر واحد"],
"2 lignes":["2 lines","2 líneas","2 Zeilen","2 righe","2 linhas","سطران"],
"Avatars":["Avatars","Avatares","Avatare","Avatar","Avatares","الصور الرمزية"],
"Oui":["Yes","Sí","Ja","Sì","Sim","نعم"],
"Non":["No","No","Nein","No","Não","لا"],
"Grouper par date":["Group by date","Agrupar por fecha","Nach Datum gruppieren","Raggruppa per data","Agrupar por data","التجميع حسب التاريخ"],
"Boîte unifiée (tous les comptes)":["Unified inbox (all accounts)","Bandeja unificada (todas las cuentas)","Gemeinsamer Posteingang (alle Konten)","Posta unificata (tutti gli account)","Caixa unificada (todas as contas)","صندوق موحّد (كل الحسابات)"],
"Compteurs des dossiers":["Folder counters","Contadores de carpetas","Ordnerzähler","Contatori delle cartelle","Contadores das pastas","عدّادات المجلدات"],
"Total":["Total","Total","Gesamt","Totale","Total","الإجمالي"],
"Actions au survol":["Hover actions","Acciones al pasar el ratón","Aktionen beim Überfahren","Azioni al passaggio del mouse","Ações ao passar o rato","إجراءات عند التمرير"],
"Lu / non lu":["Read / unread","Leído / no leído","Gelesen / ungelesen","Letto / non letto","Lida / não lida","مقروء / غير مقروء"],
"Après archivage ou suppression":["After archiving or deleting","Tras archivar o eliminar","Nach Archivieren oder Löschen","Dopo l’archiviazione o l’eliminazione","Depois de arquivar ou eliminar","بعد الأرشفة أو الحذف"],
"Message suivant":["Next message","Mensaje siguiente","Nächste Nachricht","Messaggio successivo","Mensagem seguinte","الرسالة التالية"],
"Précédent":["Previous","Anterior","Vorherige","Precedente","Anterior","السابقة"],
"Revenir à la liste":["Back to the list","Volver a la lista","Zurück zur Liste","Torna all’elenco","Voltar à lista","العودة إلى القائمة"],
"Marquer comme lu ":["Mark as read","Marcar como leído","Als gelesen markieren","Segna come letto","Marcar como lida","تعليم كمقروء"],
"Tout de suite":["Immediately","Inmediatamente","Sofort","Subito","Imediatamente","فورًا"],
"Après 2 s":["After 2 s","Tras 2 s","Nach 2 s","Dopo 2 s","Após 2 s","بعد ثانيتين"],
"Manuellement":["Manually","Manualmente","Manuell","Manualmente","Manualmente","يدويًا"],
"Images distantes":["Remote images","Imágenes remotas","Externe Bilder","Immagini remote","Imagens remotas","الصور البعيدة"],
"Bloquer (recommandé)":["Block (recommended)","Bloquear (recomendado)","Blockieren (empfohlen)","Blocca (consigliato)","Bloquear (recomendado)","حظر (موصى به)"],
"Toujours afficher":["Always show","Mostrar siempre","Immer anzeigen","Mostra sempre","Mostrar sempre","العرض دائمًا"],
"Les images distantes peuvent servir à savoir quand tu ouvres un mail.":["Remote images can be used to know when you open an email.","Las imágenes remotas pueden servir para saber cuándo abres un correo.","Externe Bilder können verraten, wann du eine E-Mail öffnest.","Le immagini remote possono rivelare quando apri una email.","As imagens remotas podem servir para saber quando abres um email.","قد تُستخدم الصور البعيدة لمعرفة متى تفتح رسالة."],
"Fond des messages":["Message background","Fondo de los mensajes","Nachrichtenhintergrund","Sfondo dei messaggi","Fundo das mensagens","خلفية الرسائل"],
"Blanc (fidèle)":["White (faithful)","Blanco (fiel)","Weiß (originalgetreu)","Bianco (fedele)","Branco (fiel)","أبيض (مطابق)"],
"Suivre le thème (sombre)":["Follow the theme (dark)","Seguir el tema (oscuro)","Design folgen (dunkel)","Segui il tema (scuro)","Seguir o tema (escuro)","اتباع السمة (داكن)"],
"Taille du texte des messages":["Message text size","Tamaño del texto de los mensajes","Textgröße der Nachrichten","Dimensione del testo dei messaggi","Tamanho do texto das mensagens","حجم نص الرسائل"],
"Largeur de lecture":["Reading width","Ancho de lectura","Lesebreite","Larghezza di lettura","Largura de leitura","عرض القراءة"],
"Normale":["Normal","Normal","Normal","Normale","Normal","عادي"],
"Large":["Wide","Ancho","Breit","Larga","Larga","عريض"],
"Pleine":["Full","Completo","Voll","Piena","Total","كامل"],
"Libellés des boutons":["Button labels","Etiquetas de los botones","Schaltflächenbeschriftungen","Etichette dei pulsanti","Etiquetas dos botões","تسميات الأزرار"],
"Police par défaut":["Default font","Fuente predeterminada","Standardschrift","Carattere predefinito","Tipo de letra predefinido","الخط الافتراضي"],
"Taille du texte":["Text size","Tamaño del texto","Textgröße","Dimensione del testo","Tamanho do texto","حجم النص"],
"Délai pour annuler l’envoi":["Undo send delay","Plazo para deshacer el envío","Zeit zum Rückgängigmachen","Tempo per annullare l’invio","Prazo para anular o envio","مهلة التراجع عن الإرسال"],
"Fenêtre de rédaction":["Compose window","Ventana de redacción","Verfassen-Fenster","Finestra di scrittura","Janela de escrita","نافذة الكتابة"],
"Flottante":["Floating","Flotante","Schwebend","Mobile","Flutuante","عائمة"],
"Avertir si l’objet est vide":["Warn if the subject is empty","Avisar si el asunto está vacío","Warnen, wenn der Betreff leer ist","Avvisa se l’oggetto è vuoto","Avisar se o assunto estiver vazio","التنبيه إذا كان الموضوع فارغًا"],
"Notifications des nouveaux messages":["New message notifications","Notificaciones de nuevos mensajes","Benachrichtigungen bei neuen Nachrichten","Notifiche dei nuovi messaggi","Notificações de novas mensagens","إشعارات الرسائل الجديدة"],
"Son":["Sound","Sonido","Ton","Suono","Som","الصوت"],
"Garder Hamama dans la zone de notification à la fermeture":["Keep Hamama in the notification area when closed","Mantener Hamama en el área de notificación al cerrar","Hamama beim Schließen im Infobereich behalten","Mantieni Hamama nell’area di notifica alla chiusura","Manter o Hamama na área de notificação ao fechar","إبقاء حمامة في منطقة الإشعارات عند الإغلاق"],
"Hamama continue de recevoir les messages quand la fenêtre est fermée.":["Hamama keeps receiving messages when the window is closed.","Hamama sigue recibiendo mensajes con la ventana cerrada.","Hamama empfängt weiter Nachrichten, wenn das Fenster geschlossen ist.","Hamama continua a ricevere i messaggi a finestra chiusa.","O Hamama continua a receber mensagens com a janela fechada.","يواصل حمامة استقبال الرسائل عند إغلاق النافذة."],
"Lancer Hamama au démarrage de Windows":["Start Hamama with Windows","Iniciar Hamama al arrancar Windows","Hamama mit Windows starten","Avvia Hamama all’avvio di Windows","Iniciar o Hamama com o Windows","تشغيل حمامة عند بدء Windows"],
"Application mail par défaut":["Default email app","Aplicación de correo predeterminada","Standard-E-Mail-App","App di posta predefinita","Aplicação de email predefinida","تطبيق البريد الافتراضي"],
"Définir Hamama pour les liens « mailto: »":["Use Hamama for “mailto:” links","Usar Hamama para los enlaces «mailto:»","Hamama für „mailto:“-Links verwenden","Usa Hamama per i link «mailto:»","Usar o Hamama para ligações «mailto:»","استخدام حمامة لروابط «mailto:»"],
"Windows ouvre ses Paramètres : choisis Hamama pour « MAILTO ».":["Windows opens its Settings: choose Hamama for “MAILTO”.","Windows abre su Configuración: elige Hamama para «MAILTO».","Windows öffnet die Einstellungen: wähle Hamama für „MAILTO“.","Windows apre le Impostazioni: scegli Hamama per «MAILTO».","O Windows abre as Definições: escolhe o Hamama para «MAILTO».","يفتح Windows الإعدادات: اختر حمامة لـ «MAILTO»."],
"Raccourcis clavier":["Keyboard shortcuts","Atajos de teclado","Tastenkürzel","Scorciatoie da tastiera","Atalhos de teclado","اختصارات لوحة المفاتيح"],
"Activés":["On","Activados","Aktiviert","Attive","Ativados","مفعّلة"],
"Désactivés":["Off","Desactivados","Deaktiviert","Disattive","Desativados","معطّلة"],
"Rechercher":["Search","Buscar","Suchen","Cerca","Pesquisar","بحث"],
"Tout sélectionner":["Select all","Seleccionar todo","Alles auswählen","Seleziona tutto","Selecionar tudo","تحديد الكل"],
"Message précédent":["Previous message","Mensaje anterior","Vorherige Nachricht","Messaggio precedente","Mensagem anterior","الرسالة السابقة"],
"Fermer / retour":["Close / back","Cerrar / volver","Schließen / zurück","Chiudi / indietro","Fechar / voltar","إغلاق / رجوع"],
"Cette aide":["This help","Esta ayuda","Diese Hilfe","Questa guida","Esta ajuda","هذه المساعدة"],
"Entrée":["Enter","Intro","Enter","Invio","Enter","Enter"],
"Échap":["Esc","Esc","Esc","Esc","Esc","Esc"],
"Suppr":["Del","Supr","Entf","Canc","Del","Del"],
"Ctrl Entrée":["Ctrl Enter","Ctrl Intro","Strg Enter","Ctrl Invio","Ctrl Enter","Ctrl Enter"],
"Application mail":["Email app","Aplicación de correo","E-Mail-App","App di posta","Aplicação de email","تطبيق بريد"],
"Sans publicité · sans pistage · tes messages restent entre toi et ton fournisseur.":["No ads · no tracking · your messages stay between you and your provider.","Sin publicidad · sin rastreo · tus mensajes quedan entre tú y tu proveedor.","Ohne Werbung · ohne Tracking · deine Nachrichten bleiben zwischen dir und deinem Anbieter.","Senza pubblicità · senza tracciamento · i tuoi messaggi restano tra te e il tuo provider.","Sem publicidade · sem rastreio · as tuas mensagens ficam entre ti e o teu fornecedor.","بلا إعلانات · بلا تتبّع · تبقى رسائلك بينك وبين مزوّدك."],
"Hamama est gratuit, sans publicité et ne lit jamais tes messages.":["Hamama is free, ad-free and never reads your messages.","Hamama es gratuito, sin publicidad y nunca lee tus mensajes.","Hamama ist kostenlos, werbefrei und liest niemals deine Nachrichten.","Hamama è gratuito, senza pubblicità e non legge mai i tuoi messaggi.","O Hamama é gratuito, sem publicidade e nunca lê as tuas mensagens.","حمامة مجاني وبلا إعلانات ولا يقرأ رسائلك أبدًا."],
"S’il te rend service, tu peux soutenir son développement":["If it helps you, you can support its development","Si te resulta útil, puedes apoyar su desarrollo","Wenn es dir hilft, kannst du die Entwicklung unterstützen","Se ti è utile, puoi sostenerne lo sviluppo","Se te for útil, podes apoiar o seu desenvolvimento","إن كان مفيدًا لك، يمكنك دعم تطويره"],
"Lien de paiement bientôt disponible":["Payment link coming soon","Enlace de pago disponible pronto","Zahlungslink bald verfügbar","Link di pagamento presto disponibile","Ligação de pagamento disponível em breve","رابط الدفع متاح قريبًا"],
"Paiement sécurisé · Apple Pay, Apple Card et cartes bancaires":["Secure payment · Apple Pay, Apple Card and bank cards","Pago seguro · Apple Pay, Apple Card y tarjetas","Sichere Zahlung · Apple Pay, Apple Card und Bankkarten","Pagamento sicuro · Apple Pay, Apple Card e carte","Pagamento seguro · Apple Pay, Apple Card e cartões","دفع آمن · Apple Pay وApple Card والبطاقات البنكية"],
"Payer avec Apple Pay ou carte":["Pay with Apple Pay or card","Pagar con Apple Pay o tarjeta","Mit Apple Pay oder Karte zahlen","Paga con Apple Pay o carta","Pagar com Apple Pay ou cartão","الدفع عبر Apple Pay أو بطاقة"],
"Mises à jour automatiques":["Automatic updates","Actualizaciones automáticas","Automatische Updates","Aggiornamenti automatici","Atualizações automáticas","التحديثات التلقائية"],
"Désactivées en mode développement":["Disabled in development mode","Desactivadas en modo desarrollo","Im Entwicklungsmodus deaktiviert","Disattivati in modalità sviluppo","Desativadas no modo de desenvolvimento","معطّلة في وضع التطوير"],
"Assurées par le Microsoft Store":["Handled by the Microsoft Store","Gestionadas por Microsoft Store","Über den Microsoft Store","Gestiti dal Microsoft Store","Asseguradas pela Microsoft Store","يتولاها Microsoft Store"],
"Recherche d’une mise à jour…":["Checking for updates…","Buscando actualizaciones…","Suche nach Updates…","Ricerca aggiornamenti…","A procurar atualizações…","جارٍ البحث عن تحديث…"],
"Hamama est à jour":["Hamama is up to date","Hamama está actualizado","Hamama ist aktuell","Hamama è aggiornato","O Hamama está atualizado","حمامة محدّث"],
"Les nouvelles versions s’installent toutes seules, sans réinstaller.":["New versions install by themselves, no reinstall needed.","Las nuevas versiones se instalan solas, sin reinstalar.","Neue Versionen installieren sich selbst, ohne Neuinstallation.","Le nuove versioni si installano da sole, senza reinstallare.","As novas versões instalam-se sozinhas, sem reinstalar.","تُثبّت الإصدارات الجديدة تلقائيًا دون إعادة تثبيت."],
"Tu peux continuer à utiliser Hamama.":["You can keep using Hamama.","Puedes seguir usando Hamama.","Du kannst Hamama weiter benutzen.","Puoi continuare a usare Hamama.","Podes continuar a usar o Hamama.","يمكنك متابعة استخدام حمامة."],
"Un simple redémarrage de Hamama suffit.":["A quick restart of Hamama is all it takes.","Basta con reiniciar Hamama.","Ein Neustart von Hamama genügt.","Basta riavviare Hamama.","Basta reiniciar o Hamama.","تكفي إعادة تشغيل حمامة."],
"Redémarrer":["Restart","Reiniciar","Neu starten","Riavvia","Reiniciar","إعادة التشغيل"],
"Télécharger":["Download","Descargar","Herunterladen","Scarica","Transferir","تنزيل"],
"Version portable : télécharge le nouveau fichier.":["Portable version: download the new file.","Versión portátil: descarga el nuevo archivo.","Portable Version: lade die neue Datei herunter.","Versione portatile: scarica il nuovo file.","Versão portátil: transfere o novo ficheiro.","النسخة المحمولة: نزّل الملف الجديد."],
"Impossible de vérifier les mises à jour":["Couldn’t check for updates","No se pudieron buscar actualizaciones","Updates konnten nicht geprüft werden","Impossibile verificare gli aggiornamenti","Não foi possível verificar atualizações","تعذّر التحقق من التحديثات"],
"Pas de connexion ?":["No connection?","¿Sin conexión?","Keine Verbindung?","Nessuna connessione?","Sem ligação?","لا يوجد اتصال؟"],
"Vérification au démarrage puis toutes les 30 minutes.":["Checked at startup, then every 30 minutes.","Comprobación al inicio y luego cada 30 minutos.","Prüfung beim Start, dann alle 30 Minuten.","Controllo all’avvio, poi ogni 30 minuti.","Verificação no arranque e depois a cada 30 minutos.","التحقق عند التشغيل ثم كل 30 دقيقة."],
"Contenu du message":["Message content","Contenido del mensaje","Nachrichteninhalt","Contenuto del messaggio","Conteúdo da mensagem","محتوى الرسالة"],
"Glisser pour redimensionner (double-clic : taille par défaut)":["Drag to resize (double-click: default size)","Arrastra para cambiar el tamaño (doble clic: tamaño predeterminado)","Ziehen zum Ändern der Größe (Doppelklick: Standardgröße)","Trascina per ridimensionare (doppio clic: dimensione predefinita)","Arrasta para redimensionar (duplo clique: tamanho predefinido)","اسحب لتغيير الحجم (نقر مزدوج: الحجم الافتراضي)"],
"Pièce jointe expirée : rouvre le message.":["Attachment expired: reopen the message.","Adjunto caducado: vuelve a abrir el mensaje.","Anhang abgelaufen: Öffne die Nachricht erneut.","Allegato scaduto: riapri il messaggio.","Anexo expirado: reabre a mensagem.","انتهت صلاحية المرفق: أعد فتح الرسالة."],
"Identifiant ou mot de passe refusé. Pour Gmail, iCloud et Yahoo il faut un « mot de passe d’application ».":["Username or password rejected. Gmail, iCloud and Yahoo need an “app password”.","Usuario o contraseña rechazados. Gmail, iCloud y Yahoo necesitan una «contraseña de aplicación».","Benutzername oder Passwort abgelehnt. Gmail, iCloud und Yahoo benötigen ein „App-Passwort“.","Nome utente o password rifiutati. Gmail, iCloud e Yahoo richiedono una «password per le app».","Utilizador ou palavra-passe recusados. Gmail, iCloud e Yahoo precisam de uma «palavra-passe de aplicação».","تم رفض اسم المستخدم أو كلمة المرور. يحتاج Gmail وiCloud وYahoo إلى «كلمة مرور تطبيق»."],
"Serveur introuvable (vérifie l’adresse du serveur ou ta connexion Internet).":["Server not found (check the server address or your Internet connection).","Servidor no encontrado (revisa la dirección del servidor o tu conexión a Internet).","Server nicht gefunden (prüfe die Serveradresse oder deine Internetverbindung).","Server non trovato (verifica l’indirizzo del server o la connessione a Internet).","Servidor não encontrado (verifica o endereço do servidor ou a ligação à Internet).","الخادم غير موجود (تحقّق من عنوان الخادم أو اتصالك بالإنترنت)."],
"Le serveur refuse la connexion (port incorrect ?).":["The server refuses the connection (wrong port?).","El servidor rechaza la conexión (¿puerto incorrecto?).","Der Server verweigert die Verbindung (falscher Port?).","Il server rifiuta la connessione (porta errata?).","O servidor recusa a ligação (porta incorreta?).","يرفض الخادم الاتصال (منفذ غير صحيح؟)."],
"Le serveur ne répond pas (délai dépassé).":["The server isn’t responding (timeout).","El servidor no responde (tiempo agotado).","Der Server antwortet nicht (Zeitüberschreitung).","Il server non risponde (timeout).","O servidor não responde (tempo esgotado).","الخادم لا يستجيب (انتهت المهلة)."],
"Certificat de sécurité du serveur invalide.":["Invalid server security certificate.","Certificado de seguridad del servidor no válido.","Ungültiges Sicherheitszertifikat des Servers.","Certificato di sicurezza del server non valido.","Certificado de segurança do servidor inválido.","شهادة أمان الخادم غير صالحة."],
"Ce fournisseur exige la connexion sécurisée (OAuth).":["This provider requires secure sign-in (OAuth).","Este proveedor exige inicio de sesión seguro (OAuth).","Dieser Anbieter verlangt eine sichere Anmeldung (OAuth).","Questo provider richiede l’accesso sicuro (OAuth).","Este fornecedor exige início de sessão seguro (OAuth).","يتطلب هذا المزوّد تسجيل دخول آمنًا (OAuth)."],
"Message introuvable (il a peut-être été déplacé).":["Message not found (it may have been moved).","Mensaje no encontrado (puede que se haya movido).","Nachricht nicht gefunden (vielleicht verschoben).","Messaggio non trovato (forse è stato spostato).","Mensagem não encontrada (pode ter sido movida).","الرسالة غير موجودة (ربما تم نقلها)."],
"Dossier introuvable":["Folder not found","Carpeta no encontrada","Ordner nicht gefunden","Cartella non trovata","Pasta não encontrada","المجلد غير موجود"],
"Pas de dossier Brouillons sur ce compte":["No Drafts folder on this account","No hay carpeta Borradores en esta cuenta","Kein Entwürfe-Ordner in diesem Konto","Nessuna cartella Bozze in questo account","Não há pasta Rascunhos nesta conta","لا يوجد مجلد مسودات في هذا الحساب"],
"Compte introuvable":["Account not found","Cuenta no encontrada","Konto nicht gefunden","Account non trovato","Conta não encontrada","الحساب غير موجود"],
"Délai dépassé : connexion annulée.":["Timed out: sign-in canceled.","Tiempo agotado: conexión cancelada.","Zeit abgelaufen: Anmeldung abgebrochen.","Tempo scaduto: accesso annullato.","Tempo esgotado: início de sessão cancelado.","انتهت المهلة: تم إلغاء تسجيل الدخول."],
"Bloquer l’expéditeur":["Block sender","Bloquear remitente","Absender blockieren","Blocca mittente","Bloquear remetente","حظر المرسل"],
"Bloquer":["Block","Bloquear","Blockieren","Blocca","Bloquear","حظر"],
"Débloquer":["Unblock","Desbloquear","Entsperren","Sblocca","Desbloquear","إلغاء الحظر"],
"Bloqués":["Blocked","Bloqueados","Blockiert","Bloccati","Bloqueados","المحظورون"],
"Expéditeurs bloqués":["Blocked senders","Remitentes bloqueados","Blockierte Absender","Mittenti bloccati","Remetentes bloqueados","المرسلون المحظورون"],
"Adresse ou @domaine":["Address or @domain","Dirección o @dominio","Adresse oder @Domain","Indirizzo o @dominio","Endereço ou @domínio","العنوان أو @النطاق"],
"Ajouter":["Add","Añadir","Hinzufügen","Aggiungi","Adicionar","إضافة"],
"Aucun expéditeur bloqué.":["No blocked senders.","Ningún remitente bloqueado.","Keine blockierten Absender.","Nessun mittente bloccato.","Nenhum remetente bloqueado.","لا يوجد مرسلون محظورون."],
"Tout le domaine":["Whole domain","Todo el dominio","Gesamte Domain","Intero dominio","Todo o domínio","النطاق بالكامل"],
"Les messages des expéditeurs bloqués vont directement dans Indésirables, sans notification. Pour bloquer tout un domaine, écris @domaine.fr.":["Messages from blocked senders go straight to Junk, with no notification. To block a whole domain, type @domain.com.","Los mensajes de remitentes bloqueados van directamente a No deseado, sin notificación. Para bloquear todo un dominio, escribe @dominio.com.","Nachrichten blockierter Absender landen direkt im Junk, ohne Benachrichtigung. Um eine ganze Domain zu blockieren, gib @domain.de ein.","I messaggi dei mittenti bloccati vanno direttamente in Indesiderata, senza notifica. Per bloccare un intero dominio, scrivi @dominio.it.","As mensagens de remetentes bloqueados vão diretamente para o Lixo eletrónico, sem notificação. Para bloquear um domínio inteiro, escreve @dominio.pt.","تذهب رسائل المرسلين المحظورين مباشرة إلى غير المرغوب فيه دون إشعار. لحظر نطاق كامل اكتب ‎@domain.com."],
"Ses messages iront directement dans Indésirables, sans notification. Ceux déjà reçus y seront aussi déplacés.":["Their messages will go straight to Junk, with no notification. Those already received will be moved there too.","Sus mensajes irán directamente a No deseado, sin notificación. Los ya recibidos también se moverán allí.","Die Nachrichten landen direkt im Junk, ohne Benachrichtigung. Bereits empfangene werden ebenfalls dorthin verschoben.","I suoi messaggi andranno direttamente in Indesiderata, senza notifica. Anche quelli già ricevuti verranno spostati lì.","As mensagens irão diretamente para o Lixo eletrónico, sem notificação. As já recebidas também serão movidas.","ستذهب رسائله مباشرة إلى غير المرغوب فيه دون إشعار، وستُنقل إليه الرسائل المستلمة سابقًا أيضًا."],
"Tous les messages de ce domaine iront directement dans Indésirables, sans notification. Ceux déjà reçus y seront aussi déplacés.":["All messages from this domain will go straight to Junk, with no notification. Those already received will be moved there too.","Todos los mensajes de este dominio irán directamente a No deseado, sin notificación. Los ya recibidos también se moverán allí.","Alle Nachrichten dieser Domain landen direkt im Junk, ohne Benachrichtigung. Bereits empfangene werden ebenfalls dorthin verschoben.","Tutti i messaggi di questo dominio andranno direttamente in Indesiderata, senza notifica. Anche quelli già ricevuti verranno spostati lì.","Todas as mensagens deste domínio irão diretamente para o Lixo eletrónico, sem notificação. As já recebidas também serão movidas.","ستذهب كل رسائل هذا النطاق مباشرة إلى غير المرغوب فيه دون إشعار، وستُنقل إليه الرسائل المستلمة سابقًا أيضًا."],
"Cet expéditeur est bloqué : ses messages vont dans Indésirables.":["This sender is blocked: their messages go to Junk.","Este remitente está bloqueado: sus mensajes van a No deseado.","Dieser Absender ist blockiert: Seine Nachrichten landen im Junk.","Questo mittente è bloccato: i suoi messaggi vanno in Indesiderata.","Este remetente está bloqueado: as mensagens vão para o Lixo eletrónico.","هذا المرسل محظور: تذهب رسائله إلى غير المرغوب فيه."],
"Adresse ou domaine invalide.":["Invalid address or domain.","Dirección o dominio no válido.","Ungültige Adresse oder Domain.","Indirizzo o dominio non valido.","Endereço ou domínio inválido.","عنوان أو نطاق غير صالح."],
"Bloquer {0}":["Block {0}","Bloquear {0}","{0} blockieren","Blocca {0}","Bloquear {0}","حظر {0}"],
"Bloquer {0} ?":["Block {0}?","¿Bloquear {0}?","{0} blockieren?","Bloccare {0}?","Bloquear {0}?","حظر {0}؟"],
"Bloquer tout le domaine {0}":["Block the whole domain {0}","Bloquear todo el dominio {0}","Gesamte Domain {0} blockieren","Blocca l’intero dominio {0}","Bloquear todo o domínio {0}","حظر النطاق {0} بالكامل"],
"Débloquer {0}":["Unblock {0}","Desbloquear {0}","{0} entsperren","Sblocca {0}","Desbloquear {0}","إلغاء حظر {0}"],
"{0} bloqué":["{0} blocked","{0} bloqueado","{0} blockiert","{0} bloccato","{0} bloqueado","تم حظر {0}"],
"{0} débloqué":["{0} unblocked","{0} desbloqueado","{0} entsperrt","{0} sbloccato","{0} desbloqueado","تم إلغاء حظر {0}"],
"{0} bloqué · {1} messages déplacés dans Indésirables":["{0} blocked · {1} messages moved to Junk","{0} bloqueado · {1} mensajes movidos a No deseado","{0} blockiert · {1} Nachrichten in Junk verschoben","{0} bloccato · {1} messaggi spostati in Indesiderata","{0} bloqueado · {1} mensagens movidas para o Lixo eletrónico","تم حظر {0} · نُقلت {1} رسائل إلى غير المرغوب فيه"],
"{0} bloqué · 1 message déplacé dans Indésirables":["{0} blocked · 1 message moved to Junk","{0} bloqueado · 1 mensaje movido a No deseado","{0} blockiert · 1 Nachricht in Junk verschoben","{0} bloccato · 1 messaggio spostato in Indesiderata","{0} bloqueado · 1 mensagem movida para o Lixo eletrónico","تم حظر {0} · نُقلت رسالة واحدة إلى غير المرغوب فيه"],
"Barid":["Barid","Barid","Barid","Barid","Barid","Barid"],
/* --- textes avec parties variables --- */
"{0} sélectionnés":["{0} selected","{0} seleccionados","{0} ausgewählt","{0} selezionati","{0} selecionadas","{0} محدّدة"],
"{0} sélectionné":["{0} selected","{0} seleccionado","{0} ausgewählt","{0} selezionato","{0} selecionada","{0} محدّدة"],
"{0} messages sélectionnés":["{0} messages selected","{0} mensajes seleccionados","{0} Nachrichten ausgewählt","{0} messaggi selezionati","{0} mensagens selecionadas","{0} رسائل محدّدة"],
"Résultats « {0} »":["Results “{0}”","Resultados «{0}»","Ergebnisse „{0}“","Risultati «{0}»","Resultados «{0}»","نتائج «{0}»"],
"Répondre à {0}…":["Reply to {0}…","Responder a {0}…","{0} antworten…","Rispondi a {0}…","Responder a {0}…","الرد على {0}…"],
"Écrire à {0}":["Write to {0}","Escribir a {0}","An {0} schreiben","Scrivi a {0}","Escrever a {0}","الكتابة إلى {0}"],
"Message archivé":["Message archived","Mensaje archivado","Nachricht archiviert","Messaggio archiviato","Mensagem arquivada","تمت أرشفة الرسالة"],
"Message supprimé":["Message deleted","Mensaje eliminado","Nachricht gelöscht","Messaggio eliminato","Mensagem eliminada","تم حذف الرسالة"],
"Message marqué indésirable":["Message marked as junk","Mensaje marcado como no deseado","Nachricht als Junk markiert","Messaggio segnato come indesiderato","Mensagem marcada como lixo","تم تعليم الرسالة كغير مرغوبة"],
"Message déplacé vers « {0} »":["Message moved to “{0}”","Mensaje movido a «{0}»","Nachricht verschoben nach „{0}“","Messaggio spostato in «{0}»","Mensagem movida para «{0}»","تم نقل الرسالة إلى «{0}»"],
"{0} messages archivés":["{0} messages archived","{0} mensajes archivados","{0} Nachrichten archiviert","{0} messaggi archiviati","{0} mensagens arquivadas","تمت أرشفة {0} رسائل"],
"{0} messages supprimés":["{0} messages deleted","{0} mensajes eliminados","{0} Nachrichten gelöscht","{0} messaggi eliminati","{0} mensagens eliminadas","تم حذف {0} رسائل"],
"{0} messages marqués indésirables":["{0} messages marked as junk","{0} mensajes marcados como no deseados","{0} Nachrichten als Junk markiert","{0} messaggi segnati come indesiderati","{0} mensagens marcadas como lixo","تم تعليم {0} رسائل كغير مرغوبة"],
"{0} messages déplacés vers « {1} »":["{0} messages moved to “{1}”","{0} mensajes movidos a «{1}»","{0} Nachrichten verschoben nach „{1}“","{0} messaggi spostati in «{1}»","{0} mensagens movidas para «{1}»","تم نقل {0} رسائل إلى «{1}»"],
"Envoi dans {0} s":["Sending in {0} s","Envío en {0} s","Senden in {0} s","Invio tra {0} s","Envio dentro de {0} s","الإرسال خلال {0} ث"],
"Compte ajouté : {0}":["Account added: {0}","Cuenta añadida: {0}","Konto hinzugefügt: {0}","Account aggiunto: {0}","Conta adicionada: {0}","تمت إضافة الحساب: {0}"],
"Échec de l’envoi : {0}":["Sending failed: {0}","Error al enviar: {0}","Senden fehlgeschlagen: {0}","Invio non riuscito: {0}","Falha no envio: {0}","فشل الإرسال: {0}"],
"Brouillon gardé sur cet ordinateur ({0})":["Draft kept on this computer ({0})","Borrador guardado en este ordenador ({0})","Entwurf auf diesem Computer behalten ({0})","Bozza conservata su questo computer ({0})","Rascunho guardado neste computador ({0})","تم الاحتفاظ بالمسودة على هذا الحاسوب ({0})"],
"Adresse invalide : {0}":["Invalid address: {0}","Dirección no válida: {0}","Ungültige Adresse: {0}","Indirizzo non valido: {0}","Endereço inválido: {0}","عنوان غير صالح: {0}"],
"« {0} » dépasse 35 Mo":["“{0}” exceeds 35 MB","«{0}» supera los 35 MB","„{0}“ überschreitet 35 MB","«{0}» supera i 35 MB","«{0}» excede 35 MB","«{0}» يتجاوز 35 ميغابايت"],
"Dans « {0} »":["In “{0}”","En «{0}»","In „{0}“","In «{0}»","Em «{0}»","في «{0}»"],
"« {0} » et les messages qu’il contient seront supprimés définitivement.":["“{0}” and the messages it contains will be permanently deleted.","«{0}» y los mensajes que contiene se eliminarán definitivamente.","„{0}“ und die enthaltenen Nachrichten werden endgültig gelöscht.","«{0}» e i messaggi che contiene saranno eliminati definitivamente.","«{0}» e as mensagens que contém serão eliminadas definitivamente.","سيتم حذف «{0}» والرسائل التي يحتويها نهائيًا."],
"Vider « {0} » ?":["Empty “{0}”?","¿Vaciar «{0}»?","„{0}“ leeren?","Svuotare «{0}»?","Esvaziar «{0}»?","إفراغ «{0}»؟"],
"{0} messages seront supprimés définitivement.":["{0} messages will be permanently deleted.","{0} mensajes se eliminarán definitivamente.","{0} Nachrichten werden endgültig gelöscht.","{0} messaggi saranno eliminati definitivamente.","{0} mensagens serão eliminadas definitivamente.","سيتم حذف {0} رسائل نهائيًا."],
"1 message sera supprimé définitivement.":["1 message will be permanently deleted.","1 mensaje se eliminará definitivamente.","1 Nachricht wird endgültig gelöscht.","1 messaggio sarà eliminato definitivamente.","1 mensagem será eliminada definitivamente.","سيتم حذف رسالة واحدة نهائيًا."],
"{0} messages seront effacés pour de bon.":["{0} messages will be erased for good.","{0} mensajes se borrarán para siempre.","{0} Nachrichten werden für immer gelöscht.","{0} messaggi saranno cancellati per sempre.","{0} mensagens serão apagadas para sempre.","سيتم مسح {0} رسائل نهائيًا."],
"1 message sera effacé pour de bon.":["1 message will be erased for good.","1 mensaje se borrará para siempre.","1 Nachricht wird für immer gelöscht.","1 messaggio sarà cancellato per sempre.","1 mensagem será apagada para sempre.","سيتم مسح رسالة واحدة نهائيًا."],
"{0} sera retiré de Hamama. Tes messages restent sur le serveur.":["{0} will be removed from Hamama. Your messages stay on the server.","{0} se quitará de Hamama. Tus mensajes siguen en el servidor.","{0} wird aus Hamama entfernt. Deine Nachrichten bleiben auf dem Server.","{0} sarà rimosso da Hamama. I tuoi messaggi restano sul server.","{0} será removida do Hamama. As tuas mensagens ficam no servidor.","ستتم إزالة {0} من حمامة. تبقى رسائلك على الخادم."],
"Version {0}":["Version {0}","Versión {0}","Version {0}","Versione {0}","Versão {0}","الإصدار {0}"],
"Version {0} prête":["Version {0} ready","Versión {0} lista","Version {0} bereit","Versione {0} pronta","Versão {0} pronta","الإصدار {0} جاهز"],
"Version {0} disponible":["Version {0} available","Versión {0} disponible","Version {0} verfügbar","Versione {0} disponibile","Versão {0} disponível","الإصدار {0} متاح"],
"Nouvelle version {0} prête":["New version {0} ready","Nueva versión {0} lista","Neue Version {0} bereit","Nuova versione {0} pronta","Nova versão {0} pronta","الإصدار الجديد {0} جاهز"],
"Téléchargement de la version {0}… {1} %":["Downloading version {0}… {1} %","Descargando la versión {0}… {1} %","Version {0} wird heruntergeladen… {1} %","Download della versione {0}… {1} %","A transferir a versão {0}… {1} %","جارٍ تنزيل الإصدار {0}… {1} %"],
"Version {0} prête : Hamama redémarre en quelques secondes":["Version {0} ready: Hamama restarts in a few seconds","Versión {0} lista: Hamama se reinicia en unos segundos","Version {0} bereit: Hamama startet in wenigen Sekunden neu","Versione {0} pronta: Hamama si riavvia in pochi secondi","Versão {0} pronta: o Hamama reinicia em poucos segundos","الإصدار {0} جاهز: يعيد حمامة التشغيل خلال ثوانٍ"],
"Hamama {0} est disponible":["Hamama {0} is available","Hamama {0} está disponible","Hamama {0} ist verfügbar","Hamama {0} è disponibile","O Hamama {0} está disponível","حمامة {0} متاح"],
"{0} nouveaux messages":["{0} new messages","{0} mensajes nuevos","{0} neue Nachrichten","{0} nuovi messaggi","{0} novas mensagens","{0} رسائل جديدة"],
"De :":["From:","De:","Von:","Da:","De:","من:"],
"Date :":["Date:","Fecha:","Datum:","Data:","Data:","التاريخ:"],
"Objet :":["Subject:","Asunto:","Betreff:","Oggetto:","Assunto:","الموضوع:"],
"Écrire à":["Write to","Escribir a","Schreiben an","Scrivi a","Escrever a","الكتابة إلى"],
};
const LANGS = [['fr','Français'],['en','English'],['es','Español'],['de','Deutsch'],['it','Italiano'],['pt','Português'],['ar','العربية']];
const LIDX = { en:0, es:1, de:2, it:3, pt:4, ar:5 };
const LOCALES = { fr:'fr-FR', en:'en-GB', es:'es-ES', de:'de-DE', it:'it-IT', pt:'pt-PT', ar:'ar' };
const LANG = (() => {
  let l = 'auto';
  try { l = (JSON.parse(localStorage.getItem('hamama-settings') || '{}').lang) || 'auto'; } catch {}
  if (l === 'auto') l = (navigator.language || 'fr').slice(0, 2).toLowerCase();
  return LOCALES[l] ? l : 'en';
})();
const LOC = LOCALES[LANG];
const TRX = [];   // modèles avec parties variables
for (const k of Object.keys(I18N)) if (k.includes('{0}')) TRX.push([new RegExp('^' + k.replace(/[.*+?^$()[\]\\|]/g, '\\$&').replace(/\{(\d)\}/g, '(.+?)') + '$'), k]);
TRX.sort((a, b) => b[1].length - a[1].length);   // les modèles les plus précis d’abord
/** Traduit un texte français de l’interface (inchangé si inconnu) */
function T(s){
  if (LANG === 'fr' || s == null) return s;
  const raw = String(s), core = raw.trim(); if (!core) return raw;
  const i = LIDX[LANG];
  let out = I18N[core] ? I18N[core][i] : null;
  if (out == null) for (const [re, k] of TRX){ const m = core.match(re); if (m){ out = I18N[k][i].replace(/\{(\d)\}/g, (x, n) => T(m[+n + 1])); break; } }
  if (out == null) return raw;
  return raw.replace(core, out);
}
const TR_ATTRS = ['title', 'placeholder', 'data-tip', 'aria-label', 'data-ph'];
function trTree(root){
  if (LANG === 'fr' || !root) return;
  if (root.nodeType === 3){ if (!root.parentElement || !root.parentElement.closest('[data-notr],#ed,textarea,script,style')){ const v = T(root.nodeValue); if (v !== root.nodeValue) root.nodeValue = v; } return; }
  if (root.nodeType !== 1 || root.closest('[data-notr],#ed,textarea,script,style')) return;
  const els = [root, ...root.querySelectorAll('*')];
  for (const el of els){
    if (el.closest('[data-notr],#ed,textarea,script,style')) continue;
    for (const a of TR_ATTRS){ const v = el.getAttribute(a); if (v){ const t = T(v); if (t !== v) el.setAttribute(a, t); } }
    for (const n of el.childNodes) if (n.nodeType === 3 && n.nodeValue.trim()){ const t = T(n.nodeValue); if (t !== n.nodeValue) n.nodeValue = t; }
  }
}
if (LANG !== 'fr'){
  document.documentElement.lang = LANG;
  if (LANG === 'ar') document.documentElement.dir = 'rtl';
  new MutationObserver(ms => { for (const m of ms){
    if (m.type === 'characterData') trTree(m.target);
    else if (m.type === 'attributes') { const v = m.target.getAttribute(m.attributeName); if (v){ const t = T(v); if (t !== v) m.target.setAttribute(m.attributeName, t); } }
    else m.addedNodes.forEach(trTree);
  } }).observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: TR_ATTRS });
  trTree(document.body);
}

/* ================= Icônes (trait fin, style Pyramid) ================= */
const ICON = {
  plane:'<path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  refresh:'<path d="M21 12a9 9 0 1 1-2.6-6.4L21 8"/><path d="M21 3v5h-5"/>',
  settings:'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  heart:'<path d="M12 20s-7.5-4.6-9.3-9.2C1.5 7.6 3.6 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.4 0 5.5 3.1 4.3 6.3C19.5 15.4 12 20 12 20z"/>',
  pen:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  sidebar:'<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M9 4v16"/>',
  inbox:'<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  send:'<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
  draft:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  archive:'<rect x="3" y="4" width="18" height="5" rx="1.5"/><path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M10 13h4"/>',
  trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/>',
  junk:'<path d="M7.9 2h8.2L22 7.9v8.2L16.1 22H7.9L2 16.1V7.9z"/><path d="M12 8v4M12 16h0"/>',
  star:'<path d="m12 3 2.8 5.6 6.2.9-4.5 4.4 1 6.1L12 17l-5.5 3 1-6.1L3 9.5l6.2-.9z"/>',
  folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  'folder-in':'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M12 10v6M9 13l3 3 3-3"/>',
  'folder-plus':'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M12 10v6M9 13h6"/>',
  all:'<path d="M4 6h16M4 12h16M4 18h10"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  'mail-open':'<path d="M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9l-9-7z"/><path d="m3 10 9 6 9-6"/>',
  reply:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  'reply-all':'<path d="M7 14 2 9l5-5"/><path d="M12 14 7 9l5-5"/><path d="M7 9h8.5a5.5 5.5 0 0 1 0 11H13"/>',
  forward:'<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>',
  clip:'<path d="m21 11-8.6 8.6a5.5 5.5 0 0 1-7.8-7.8l8.6-8.6a3.7 3.7 0 0 1 5.2 5.2l-8.6 8.6a1.8 1.8 0 0 1-2.6-2.6l8-8"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  check:'<path d="m5 12 5 5L20 7"/>',
  checks:'<path d="m2 12 5 5L17 7"/><path d="m12 15 2 2 9-10"/>',
  'square-check':'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m8 12 3 3 5-6"/>',
  chev:'<path d="m6 9 6 6 6-6"/>',
  left:'<path d="m15 18-6-6 6-6"/>',
  dots:'<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  download:'<path d="M12 3v12M7 10l5 5 5-5M4 19h16"/>',
  print:'<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
  code:'<path d="m8 7-5 5 5 5M16 7l5 5-5 5"/>',
  link:'<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
  bold:'<path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/>',
  italic:'<path d="M19 4h-9M14 20H5M15 4 9 20"/>',
  underline:'<path d="M6 4v6a6 6 0 0 0 12 0V4M4 20h16"/>',
  strike:'<path d="M16 6a4 4 0 0 0-4-2c-2.5 0-4 1.3-4 3.2 0 4 8 2.6 8 6.8 0 2-1.8 4-4.5 4A5 5 0 0 1 7 16M4 12h16"/>',
  ul:'<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r=".8"/><circle cx="4.5" cy="12" r=".8"/><circle cx="4.5" cy="18" r=".8"/>',
  ol:'<path d="M10 6h10M10 12h10M10 18h10M4 4h1v4M4 8h2M4 14.5c0-.8 2-1.3 2 0 0 .8-2 1.8-2 3.5h2"/>',
  quote:'<path d="M7 7H4v6h4v-2c0 3-1 4-3 5M17 7h-3v6h4v-2c0 3-1 4-3 5"/>',
  eraser:'<path d="m7 21-4.3-4.3a1 1 0 0 1 0-1.4l10-10a1 1 0 0 1 1.4 0l5.6 5.6a1 1 0 0 1 0 1.4L13 19M7 21h14M9.5 9.5l5 5"/>',
  palette:'<circle cx="12" cy="12" r="9"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="10.5" r="1"/><path d="M12 21a2.5 2.5 0 0 1 0-5h1.5a2 2 0 0 0 0-4"/>',
  min:'<path d="M5 12h14"/>',
  max:'<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  keyboard:'<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h0M10 10h0M14 10h0M18 10h0M7 14h10"/>',
  wallet:'<rect x="3" y="6" width="18" height="14" rx="2.5"/><path d="M16 13h2M3 10h18M6 6V5a2 2 0 0 1 2-2h8"/>',
  undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
  eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  ban:'<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
  sig:'<path d="M3 17c3-1 4.5-9 6.5-9S9 16 11 16s3-4 4.5-4 1 3 2.5 3H21M3 21h18"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>',
  key:'<circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 9.2-9.2M17 6l3 3M15 8l2 2"/>',
  ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  open:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
};
const ic = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ICON[n] || ''}</svg>`;
document.querySelectorAll('[data-ic]').forEach(el => el.insertAdjacentHTML('afterbegin', ic(el.dataset.ic)));

/* ================= Outils ================= */
const $ = s => document.querySelector(s);
const N = window.native || null;
const MOBILE = !!N && (N.platform === 'android' || N.platform === 'ios');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const store = { get(k){ try{ return localStorage.getItem(k); }catch{ return null; } }, set(k,v){ try{ localStorage.setItem(k,v); }catch{} }, del(k){ try{ localStorage.removeItem(k); }catch{} } };
const J = (k, d) => { try { const v = JSON.parse(store.get(k)); return v == null ? d : v; } catch { return d; } };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const isTyping = e => { const t = e.target; return t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)); };
const fmtSize = n => { const u = LANG === 'fr' ? ['o','Ko','Mo'] : ['B','KB','MB']; return n < 1024 ? n + ' ' + u[0] : n < 1048576 ? Math.round(n/1024) + ' ' + u[1] : (n/1048576).toFixed(1).replace('.', LANG === 'en' ? '.' : ',') + ' ' + u[2]; };
const plural = (n, w) => `${n} ${w}${n > 1 ? 's' : ''}`;
const D0 = d => { const x = new Date(d); x.setHours(0,0,0,0); return x; };
function fmtDate(iso){
  const d = new Date(iso), now = new Date(), t0 = D0(now), dd = D0(d), diff = (t0 - dd) / 864e5;
  if (diff <= 0) return d.toLocaleTimeString(LOC, { hour:'2-digit', minute:'2-digit' });
  if (diff === 1) return 'Hier';
  if (diff < 7) return d.toLocaleDateString(LOC, { weekday:'short' }).replace('.', '');
  if (d.getFullYear() === now.getFullYear()) return d.toLocaleDateString(LOC, { day:'numeric', month:'short' });
  return d.toLocaleDateString(LOC);
}
const fmtLong = iso => new Date(iso).toLocaleString(LOC, { weekday:'long', day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' });
function grpOf(iso){
  const diff = (D0(new Date()) - D0(new Date(iso))) / 864e5;
  if (diff <= 0) return 'Aujourd’hui'; if (diff === 1) return 'Hier'; if (diff < 7) return 'Cette semaine';
  if (diff < 31) return 'Ce mois-ci';
  return new Date(iso).toLocaleDateString(LOC, { month:'long', year:'numeric' });
}
const AVC = ['#c8703f','#c2524a','#bf5a82','#8a6cc4','#5d6bc9','#4a84c4','#3a98a8','#3d9579','#5c9a4b','#c0962e','#7c8592'];
const hash = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); };
const nameOf = a => a ? (a.name || a.address || '').replace(/^"|"$/g, '') : '';
const initials = a => { const n = nameOf(a).replace(/[^\p{L}\p{N} ]/gu, ' ').trim(); if (!n) return '?'; const p = n.split(/\s+/); return (p[0][0] + (p.length > 1 ? p[p.length-1][0] : (p[0][1] || ''))).toUpperCase(); };
const avatar = (a, cls = '') => `<div class="av ${cls}">${esc(initials(a))}</div>`;
const fmtAddr = a => a.name ? `${a.name} <${a.address}>` : a.address;

/* ================= Bulles d’aide, toasts, fenêtres, menus ================= */
const tipEl = $('#tip'); let tipT = null;
document.addEventListener('mouseover', e => {
  if (matchMedia('(hover: none)').matches) return;
  const el = e.target.closest('[title],[data-tip]');
  if (el && el.title){ el.dataset.tip = el.title; el.removeAttribute('title'); }
  clearTimeout(tipT); tipEl.classList.remove('show');
  if (!el || !el.dataset.tip) return;
  tipT = setTimeout(() => {
    const t = el.dataset.tip, m = t.match(/^(.*) \((.+)\)$/);
    tipEl.innerHTML = m ? `${esc(m[1])}<kbd>${esc(m[2])}</kbd>` : esc(t);
    const r = el.getBoundingClientRect(), w = tipEl.offsetWidth, h = tipEl.offsetHeight;
    let x = r.left + r.width/2 - w/2, y = r.bottom + 8;
    if (y + h > innerHeight - 4) y = r.top - h - 8;
    tipEl.style.left = Math.max(6, Math.min(innerWidth - w - 6, x)) + 'px'; tipEl.style.top = y + 'px';
    tipEl.classList.add('show');
  }, 450);
});
document.addEventListener('mousedown', () => { clearTimeout(tipT); tipEl.classList.remove('show'); }, true);

function toast(msg, action, ms = 3200, exact){
  const t = document.createElement('div'); t.className = 'toast';
  t.innerHTML = `<span>${esc(msg)}</span>`;
  let done = false;
  const close = () => { if (done) return; done = true; t.style.transition = '.2s'; t.style.opacity = '0'; setTimeout(() => t.remove(), 200); };
  if (action){ const b = document.createElement('button'); b.textContent = action.label; b.onclick = () => { close(); action.fn(); }; t.appendChild(b); }
  $('#toasts').appendChild(t);
  while ($('#toasts').children.length > 3) $('#toasts').firstChild.remove();
  setTimeout(close, action && !exact ? Math.max(ms, 6000) : ms);
  return { close, el: t };
}
const errToast = e => toast('' + String(e && e.message || e).replace(/^Error invoking remote method '[^']+': (Error: )?/, ''));
const cleanErr = e => String(e && e.message || e).replace(/^Error invoking remote method '[^']+': (Error: )?/, '');

let modalOpen = 0;
function modal(html, onMount, opts = {}){
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="card ${opts.cls || ''}">${html}</div>`;
  document.body.appendChild(m); modalOpen++;
  const card = m.firstChild;
  card.querySelectorAll('[data-ic]').forEach(el => el.insertAdjacentHTML('afterbegin', ic(el.dataset.ic)));
  let closed = false;
  const close = v => { if (closed) return; closed = true; modalOpen--; m.remove(); document.removeEventListener('keydown', onKey, true); opts.onClose && opts.onClose(v); };
  const onKey = e => { if (e.key === 'Escape' && m === [...document.querySelectorAll('.modal')].pop()){ e.stopPropagation(); e.preventDefault(); close(); } };
  document.addEventListener('keydown', onKey, true);
  m.addEventListener('mousedown', e => { if (e.target === m && !opts.sticky) close(); });
  onMount && onMount(card, close);
  const f = card.querySelector('[autofocus]'); f && f.focus();
  return close;
}
function confirmBox(title, text, okLabel = 'Confirmer', danger = false){
  return new Promise(res => modal(`<h2>${esc(title)}</h2><div class="sub">${esc(text)}</div><div class="row"><button class="btn ghost" data-no>Annuler</button><button class="btn ${danger ? 'danger' : 'primary'}" data-ok autofocus>${esc(okLabel)}</button></div>`,
    (c, close) => { c.querySelector('[data-no]').onclick = () => close(false); c.querySelector('[data-ok]').onclick = () => close(true); }, { onClose: v => res(!!v) }));
}
function promptBox(title, label, value = '', okLabel = 'OK'){
  return new Promise(res => modal(`<h2>${esc(title)}</h2><label class="lbl">${esc(label)}</label><input class="field" data-v autofocus value="${esc(value)}"><div class="row"><button class="btn ghost" data-no>Annuler</button><button class="btn primary" data-ok>${esc(okLabel)}</button></div>`,
    (c, close) => { const i = c.querySelector('[data-v]'); i.select(); i.onkeydown = e => { if (e.key === 'Enter') close(i.value.trim()); }; c.querySelector('[data-no]').onclick = () => close(null); c.querySelector('[data-ok]').onclick = () => close(i.value.trim()); }, { onClose: v => res(v || null) }));
}

let menuEl = null;
function closeMenu(){ if (menuEl){ menuEl.remove(); menuEl = null; document.removeEventListener('mousedown', menuOut, true); } }
const menuOut = e => { if (menuEl && !menuEl.contains(e.target)) closeMenu(); };
function popAt(el, x, y){
  document.body.appendChild(el);
  const w = el.offsetWidth, h = el.offsetHeight;
  el.style.left = Math.max(6, Math.min(innerWidth - w - 6, x)) + 'px';
  el.style.top = Math.max(6, (y + h > innerHeight - 6 ? y - h : y)) + 'px';
}
/** items : [{ ic, label, kbd, fn, red, disabled }] ou '-' */
function menu(items, x, y){
  closeMenu();
  const el = document.createElement('div'); el.className = 'menu';
  for (const it of items){
    if (!it) continue;
    if (it === '-'){ el.insertAdjacentHTML('beforeend', '<div class="msep"></div>'); continue; }
    const b = document.createElement('button');
    if (it.red) b.className = 'red'; b.disabled = !!it.disabled;
    b.innerHTML = `${it.ic ? ic(it.ic) : ''}<span>${esc(it.label)}</span>${it.kbd ? `<kbd>${esc(it.kbd)}</kbd>` : ''}`;
    b.onclick = () => { closeMenu(); it.fn && it.fn(); };
    el.appendChild(b);
  }
  menuEl = el; popAt(el, x, y);
  setTimeout(() => document.addEventListener('mousedown', menuOut, true), 0);
}
const menuBelow = (btn, items) => { const r = btn.getBoundingClientRect(); menu(items, r.left, r.bottom + 4); };

/* ================= Personnalisation ================= */
const ACCENTS = ['#c8703f','#c2524a','#bf5a82','#8a6cc4','#5d6bc9','#4a84c4','#3a98a8','#3d9579','#5c9a4b','#c0962e'];
const DEF_SET = {
  theme:'graphite', accent:'#c8703f', layout:'trois', density:'confort', zoom:'m', radius:'doux', side:'shown',
  preview:'1', avatars:'on', groups:'on', unified:'on', qa:['archive','trash','read','star'], after:'next',
  uifont:'Inter', weight:'normal', unreadBold:'on', markRead:'delay', images:'ask', mailbg:'theme', spell:'auto', mailZoom:'100', labels:'off', readw:'normal',
  font:'Inter', fsize:'14', undoSend:'5', lang:'auto', compWin:'float', noSubjWarn:'on', keys:'on', counts:'unread'
};
let SET = { ...DEF_SET, ...J('hamama-settings', {}) };
if (!SET.mb2){ SET.mailbg = 'theme'; SET.mb2 = 1; }   // 18/11 : messages affichés sur le fond de l’appli (comme Mailbird)
const ZOOMS = { s:.9, m:1, l:1.1, xl:1.25 };
const UI_FONTS = ['Inter','Segoe UI','Arial','Calibri','Verdana','Tahoma','Trebuchet MS','Georgia'];
const uiFont = () => SET.uifont === 'Inter' || !UI_FONTS.includes(SET.uifont) ? 'Inter' : `"${SET.uifont}"`;
function setAccent(hex){
  const n = parseInt(hex.slice(1), 16), r = document.documentElement;
  r.style.setProperty('--accent', hex); r.style.setProperty('--accent-rgb', `${n>>16&255},${n>>8&255},${n&255}`);
}
const spellLang = () => SET.spell && !['auto','off'].includes(SET.spell) ? SET.spell : LANG;
function applySettings(save = true){
  const r = document.documentElement, d = r.dataset;
  d.theme = SET.theme; d.layout = SET.layout; d.density = SET.density; d.radius = SET.radius; d.side = SET.side;
  d.preview = SET.preview; d.avatars = SET.avatars; d.labels = SET.labels; d.mailbg = SET.mailbg; d.weight = SET.weight; d.unreadb = SET.unreadBold;
  r.style.setProperty('--uif', uiFont());
  if (MOBILE && SET.labels === 'on') d.labels = 'off';
  r.style.setProperty('--readw', { normal:'980px', large:'1240px', plein:'100%' }[SET.readw] || '980px');
  document.body.style.zoom = ZOOMS[SET.zoom] || 1;
  setAccent(SET.accent);
  try { r.style.setProperty('--inv', mailInv()); } catch {}
  if (save) store.set('hamama-settings', JSON.stringify(SET));
  if (N && N.prefs && applySettings.spell !== SET.spell && document.readyState !== 'loading'){ applySettings.spell = SET.spell; N.prefs({ spell: SET.spell }).catch(() => {}); }
  const ed = document.getElementById('ed'); if (ed){ ed.spellcheck = SET.spell !== 'off'; ed.lang = spellLang(); }
  if (N && N.setTitleBar){
    const cs = getComputedStyle(r);
    try { N.setTitleBar({ color: cs.getPropertyValue('--bg').trim(), symbolColor: cs.getPropertyValue('--text').trim(), height: Math.round((parseInt(cs.getPropertyValue('--hh')) || 52) * (ZOOMS[SET.zoom] || 1)) }); } catch {}
  }
}
applySettings(false);
if (N) document.documentElement.classList.add(MOBILE ? 'mobile' : 'desk', 'plat-' + N.platform);
const narrowCheck = () => document.documentElement.classList.toggle('narrow', !MOBILE && innerWidth < 640);
narrowCheck(); addEventListener('resize', narrowCheck);
const isSmall = () => MOBILE || innerWidth < 640;
const setDrawer = on => document.documentElement.classList.toggle('drawer', !!on);

/* ================= État ================= */
const ST = {
  accounts: [], providers: {}, oauth: {}, folders: {}, accErr: {},
  view: null,            // { uni:true } ou { acc, box }
  items: [], more: false, ulimit: 40, total: 0,
  filter: 'all', search: null, scope: 'box',
  sel: new Set(), anchor: null, open: null, msg: null, selMode: false, blocked: []
};
const ROLE_IC = { inbox:'inbox', drafts:'draft', sent:'send', archive:'archive', junk:'junk', trash:'trash', flagged:'star', all:'all' };
const accOf = id => ST.accounts.find(a => a.id === id);
const accColor = a => a ? (a.color || AVC[hash(a.email) % AVC.length]) : '#888';
const accLabel = a => a ? (a.label || a.email) : '';
const folderOf = (acc, box) => (ST.folders[acc] || []).find(f => f.path === box);
const itemOf = key => ST.items.find(i => i.key === key);
const viewKey = () => ST.view ? (ST.view.uni ? 'uni' : ST.view.acc + '|' + ST.view.box) : '';
const myAddrs = () => new Set(ST.accounts.map(a => a.email.toLowerCase()));
const collapsed = new Set(J('hamama-collapsed', []));

/* ================= Contacts (saisie automatique) ================= */
const CONTACTS = new Map(J('hamama-contacts', []));
let contactsDirty = false;
function learn(a, w = 0.2){
  if (!a || !a.address || !/@/.test(a.address)) return;
  const k = a.address.toLowerCase(); if (/no-?reply|ne-pas-repondre|notification|mailer-daemon/.test(k)) return;
  const c = CONTACTS.get(k) || [a.name || '', 0, 0];
  if (a.name && !c[0]) c[0] = a.name;
  c[1] = Math.min(999, c[1] + w); c[2] = Date.now(); CONTACTS.set(k, c); contactsDirty = true;
}
setInterval(() => { if (!contactsDirty) return; contactsDirty = false; const arr = [...CONTACTS].sort((a, b) => b[1][1] - a[1][1]).slice(0, 2500); store.set('hamama-contacts', JSON.stringify(arr)); }, 5000);

/* ================= Barre latérale : dossiers ================= */
function unseenTotal(){ let n = 0; for (const a of ST.accounts){ const f = (ST.folders[a.id] || []).find(x => x.role === 'inbox'); if (f) n += f.unseen; } return n; }
function renderSide(){
  const vk = viewKey(), el = $('#folders');
  let h = '';
  if (ST.accounts.length > 1 && SET.unified === 'on'){
    const n = unseenTotal();
    h += `<button class="fold uni${vk === 'uni' ? ' on' : ''}${n ? ' unread' : ''}" data-uni="1">${ic('layers')}<span class="t">Toutes les boîtes</span>${n ? `<span class="n">${n}</span>` : ''}</button>`;
  }
  for (const a of ST.accounts){
    const fl = ST.folders[a.id] || [];
    h += `<div class="acct${collapsed.has(a.id) ? ' closed' : ''}" data-acc="${a.id}"><div class="ah" data-ah="${a.id}"><span class="dot" style="background:${accColor(a)}"></span><span class="nm" data-notr>${esc(accLabel(a))}</span>${ic('chev')}</div>`;
    if (ST.accErr[a.id]) h += `<div class="err" data-fix="${a.id}">${esc(ST.accErr[a.id]).slice(0, 120)}</div>`;
    h += '<div class="fs">';
    if (!fl.length && !ST.accErr[a.id]) h += '<div class="skel" style="height:30px;margin:4px 6px"></div><div class="skel" style="height:30px;margin:4px 6px"></div>';
    for (const f of fl){
      const n = SET.counts === 'none' ? 0 : SET.counts === 'total' && !['inbox','junk'].includes(f.role) ? f.total : f.unseen;
      const unread = f.unseen && !['trash','sent','junk','drafts'].includes(f.role);   // Indésirables, Corbeille… jamais en gras
      h += `<button class="fold${vk === a.id + '|' + f.path ? ' on' : ''}${unread ? ' unread' : ''}" data-acc="${a.id}" data-box="${esc(f.path)}" style="padding-left:${10 + f.depth * 16}px">${ic(ROLE_IC[f.role] || 'folder')}<span class="t"${f.role ? '' : ' data-notr'}>${esc(f.name)}</span>${n && (f.role !== 'trash' && f.role !== 'sent' || SET.counts === 'total') ? `<span class="n">${n}</span>` : ''}</button>`;
    }
    h += '</div></div>';
  }
  el.innerHTML = h;
  const n = unseenTotal();
  document.title = n ? `Hamama (${n})` : 'Hamama';
  if (N) N.badge(n).catch(() => {});
}
$('#folders').addEventListener('click', e => {
  const u = e.target.closest('[data-uni]'); if (u){ setDrawer(false); return openView({ uni: true }); }
  const f = e.target.closest('.fold[data-box]'); if (f){ setDrawer(false); return openView({ acc: f.dataset.acc, box: f.dataset.box }); }
  const ah = e.target.closest('[data-ah]');
  if (ah){ const id = ah.dataset.ah; collapsed.has(id) ? collapsed.delete(id) : collapsed.add(id); store.set('hamama-collapsed', JSON.stringify([...collapsed])); ah.parentNode.classList.toggle('closed'); return; }
  const fx = e.target.closest('[data-fix]'); if (fx) return openAccount(fx.dataset.fix);
});
$('#folders').addEventListener('contextmenu', e => {
  const f = e.target.closest('.fold[data-box]'), ah = e.target.closest('[data-ah]');
  if (!f && !ah) return;
  e.preventDefault();
  if (ah){
    const id = ah.dataset.ah;
    return menu([
      { ic:'refresh', label:'Actualiser', fn: () => loadFolders(id) },
      { ic:'folder-plus', label:'Nouveau dossier…', fn: () => newFolder(id) },
      '-', { ic:'settings', label:'Réglages du compte…', fn: () => openAccount(id) }
    ], e.clientX, e.clientY);
  }
  const acc = f.dataset.acc, box = f.dataset.box, fo = folderOf(acc, box) || {};
  menu([
    { ic:'checks', label:'Tout marquer comme lu', disabled: !fo.unseen, fn: () => markAllRead(acc, box) },
    { ic:'folder-plus', label:'Nouveau sous-dossier…', fn: () => newFolder(acc, box) },
    { ic:'edit', label:'Renommer…', disabled: !!fo.role, fn: () => renameFolder(acc, box) },
    (fo.role === 'trash' || fo.role === 'junk') ? { ic:'trash', label:'Vider ' + (fo.role === 'trash' ? 'la corbeille' : 'les indésirables'), red: true, disabled: !fo.total, fn: () => emptyFolder(acc, box) } : null,
    !fo.role ? '-' : null,
    !fo.role ? { ic:'trash', label:'Supprimer le dossier', red: true, fn: () => deleteFolder(acc, box) } : null
  ], e.clientX, e.clientY);
});
// Glisser des messages sur un dossier
$('#folders').addEventListener('dragover', e => {
  const f = e.target.closest('.fold[data-box]'); if (!f || !DRAG) return;
  if (DRAG.some(k => k.split('|')[0] === f.dataset.acc)){ e.preventDefault(); e.dataTransfer.dropEffect = 'move'; f.classList.add('drop'); }
});
$('#folders').addEventListener('dragleave', e => { const f = e.target.closest('.fold'); f && f.classList.remove('drop'); });
$('#folders').addEventListener('drop', e => {
  const f = e.target.closest('.fold[data-box]'); if (!f || !DRAG) return; e.preventDefault(); f.classList.remove('drop');
  const keys = DRAG.filter(k => k.split('|')[0] === f.dataset.acc); DRAG = null;
  act('move', keys, f.dataset.box);
});

async function loadFolders(id){
  try { ST.folders[id] = await N.mail.folders(id); delete ST.accErr[id]; }
  catch (e) { ST.accErr[id] = cleanErr(e); }
  renderSide();
}
const loadAllFolders = () => Promise.all(ST.accounts.map(a => loadFolders(a.id)));
let foldT = null;
const refreshFoldersSoon = (id, ms = 1500) => { clearTimeout(foldT); foldT = setTimeout(() => id ? loadFolders(id) : loadAllFolders(), ms); };
function bumpUnseen(acc, box, d){ const f = folderOf(acc, box); if (f){ f.unseen = Math.max(0, f.unseen + d); renderSide(); } }

async function newFolder(acc, parent){
  const n = await promptBox('Nouveau dossier', parent ? `Dans « ${(folderOf(acc, parent) || {}).name || parent} »` : 'Nom du dossier', '', 'Créer'); if (!n) return;
  const f = folderOf(acc, parent); const path = parent ? parent + ((f && f.delimiter) || '/') + n : n;
  try { ST.folders[acc] = await N.mail.mkdir(acc, path); renderSide(); toast('Dossier créé'); } catch (e) { errToast(e); }
}
async function renameFolder(acc, box){
  const f = folderOf(acc, box); const n = await promptBox('Renommer le dossier', 'Nouveau nom', f.name, 'Renommer'); if (!n || n === f.name) return;
  const parts = box.split(f.delimiter || '/'); parts[parts.length - 1] = n;
  try { ST.folders[acc] = await N.mail.rename(acc, box, parts.join(f.delimiter || '/')); renderSide(); } catch (e) { errToast(e); }
}
async function deleteFolder(acc, box){
  const f = folderOf(acc, box);
  if (!await confirmBox('Supprimer le dossier ?', `« ${f.name} » et les messages qu’il contient seront supprimés définitivement.`, 'Supprimer', true)) return;
  try { ST.folders[acc] = await N.mail.rmdir(acc, box); if (viewKey() === acc + '|' + box) openDefault(); renderSide(); } catch (e) { errToast(e); }
}
async function emptyFolder(acc, box){
  const f = folderOf(acc, box);
  if (!await confirmBox(`Vider « ${f.name} » ?`, `${plural(f.total, 'message')} ser${f.total > 1 ? 'ont' : 'a'} supprimé${f.total > 1 ? 's' : ''} définitivement.`, 'Vider', true)) return;
  try { await N.mail.empty(acc, box); f.total = 0; f.unseen = 0; renderSide(); if (viewKey() === acc + '|' + box){ ST.items = []; renderList(); showEmptyView(); } toast('Dossier vidé'); } catch (e) { errToast(e); }
}
async function markAllRead(acc, box){
  try {
    if (ST.view && ST.view.uni) await Promise.all(ST.accounts.map(a => N.mail.allRead(a.id, 'INBOX')));
    else await N.mail.allRead(acc, box);
    ST.items.forEach(i => { if (ST.view.uni || (i.acc === acc && i.box === box)) i.seen = true; });
    (ST.view.uni ? ST.accounts.map(a => folderOf(a.id, 'INBOX')) : [folderOf(acc, box)]).forEach(f => f && (f.unseen = 0));
    renderSide(); renderList();
  } catch (e) { errToast(e); }
}

/* ================= Liste des messages ================= */
let loadTok = 0;
const setBusy = b => $('#lbar').classList.toggle('on', !!b);
function viewTitle(){
  if (ST.search) return `Résultats « ${ST.search} »`;
  if (!ST.view) return '';
  if (ST.view.uni) return 'Toutes les boîtes';
  const f = folderOf(ST.view.acc, ST.view.box);
  return f ? f.name : ST.view.box;
}
async function openView(v, { keepOpen = false } = {}){
  ST.view = v; ST.search = null; $('#q').value = ''; ST.sel.clear(); ST.more = false; ST.ulimit = 40;
  if (!keepOpen){ ST.open = null; ST.msg = null; showEmptyView(); document.documentElement.classList.remove('reading'); }
  store.set('hamama-view', JSON.stringify(v));
  renderSide(); $('#ltitle').textContent = viewTitle();
  ST.items = [];
  if (!v.uni){ try { const c = await N.mail.cached(v.acc, v.box); if (c.items && viewKey() === v.acc + '|' + v.box) ST.items = c.items; } catch {} }
  renderList(!ST.items.length);
  return refreshList();
}
function openDefault(){
  const saved = J('hamama-view', null);
  if (saved && (saved.uni ? ST.accounts.length > 1 && SET.unified === 'on' : accOf(saved.acc))) return openView(saved);
  if (ST.accounts.length > 1 && SET.unified === 'on') return openView({ uni: true });
  if (ST.accounts[0]) return openView({ acc: ST.accounts[0].id, box: 'INBOX' });
}
async function refreshList(){
  const v = ST.view; if (!v || ST.search) return;
  const tok = ++loadTok; setBusy(true);
  try {
    let r;
    if (v.uni){ r = await N.mail.unified({ limit: ST.ulimit }); r.errors && r.errors.forEach(x => ST.accErr[x.acc] = x.err); }
    else r = await N.mail.list(v.acc, v.box, { offset: 0, limit: Math.max(50, Math.min(200, ST.items.length || 50)) });
    if (tok !== loadTok) return;
    ST.items = r.items; ST.more = r.more; ST.total = r.total || r.items.length;
    if (!v.uni) delete ST.accErr[v.acc];
    r.items.forEach(i => i.from && i.from[0] && learn(i.from[0], 0.05));
    renderList();
  } catch (e) {
    if (tok !== loadTok) return;
    if (!v.uni){ ST.accErr[v.acc] = cleanErr(e); renderSide(); }
    renderList(); errToast(e);
  } finally { if (tok === loadTok) setBusy(false); }
}
async function loadMore(){
  const v = ST.view; if (!v || !ST.more) return;
  if (v.uni){ ST.ulimit += 40; return refreshList(); }
  setBusy(true);
  try {
    const r = await N.mail.list(v.acc, v.box, { offset: ST.items.length, limit: 50 });
    const have = new Set(ST.items.map(i => i.key));
    ST.items.push(...r.items.filter(i => !have.has(i.key))); ST.more = r.more; renderList();
  } catch (e) { errToast(e); } finally { setBusy(false); }
}
const visible = () => ST.items.filter(i => ST.filter === 'all' || (ST.filter === 'unread' && !i.seen) || (ST.filter === 'flagged' && i.flagged) || (ST.filter === 'att' && i.att));
function itemHTML(i){
  const role = (folderOf(i.acc, i.box) || {}).role;
  const who = (role === 'sent' || role === 'drafts' || i.draft) ? (i.to || []).map(nameOf).join(', ') || '(sans destinataire)' : nameOf(i.from && i.from[0]) || '(inconnu)';
  const whoA = (role === 'sent' || role === 'drafts') ? (i.to || [])[0] : (i.from || [])[0];
  const cls = ['it', i.seen ? '' : 'unread', ST.open === i.key ? 'on' : '', ST.sel.has(i.key) && ST.sel.size > 0 && (ST.sel.size > 1 || ST.selMode) ? 'sel' : ''].join(' ');
  const a = accOf(i.acc);
  const qa = SET.qa.map(q => ({
    archive: `<button class="ibtn" data-q="archive" title="Archiver (E)">${ic('archive')}</button>`,
    trash: `<button class="ibtn del" data-q="trash" title="Supprimer (Suppr)">${ic('trash')}</button>`,
    read: `<button class="ibtn" data-q="${i.seen ? 'unread' : 'read'}" title="${i.seen ? 'Marquer comme non lu (U)' : 'Marquer comme lu (U)'}">${ic(i.seen ? 'mail' : 'mail-open')}</button>`,
    star: `<button class="ibtn" data-q="${i.flagged ? 'unstar' : 'star'}" title="${i.flagged ? 'Ne plus suivre (S)' : 'Suivre (S)'}">${ic('star')}</button>`
  }[q] || '')).join('');
  return `<div class="${cls}" data-k="${esc(i.key)}" draggable="true">
    ${avatar(whoA || { name: who }).replace('</div>', `<span class="ck">${ic('check')}</span></div>`)}
    <div class="bd"><div class="r1"><span class="fr">${i.draft || role === 'drafts' ? '<span style="color:#f87171">Brouillon</span> · ' : ''}<span data-notr>${esc(who)}</span></span><span class="dt">${ST.view && ST.view.uni || ST.search ? `<span class="adot" style="background:${accColor(a)}" title="${esc(accLabel(a))}"></span>` : ''}${fmtDate(i.date)}</span></div>
    <div class="sb"><span class="s"${i.subject ? ' data-notr' : ''}>${esc(i.subject || '(sans objet)')}</span>${i.att ? ic('clip') : ''}${i.answered ? `<span title="Répondu" style="display:flex">${ic('reply')}</span>` : ''}${i.flagged ? `<span class="star" style="display:flex">${ic('star')}</span>` : ''}</div>
    <div class="pv" data-notr>${esc(i.preview || '')}</div></div>
    ${qa ? `<div class="qa">${qa}</div>` : ''}</div>`;
}
function renderList(skeleton){
  const el = $('#list'), items = visible();
  $('#ltitle').innerHTML = esc(viewTitle()) + (ST.search ? ` <small>${items.length}</small>` : '');
  document.querySelectorAll('#chips button').forEach(b => b.classList.toggle('on', b.dataset.f === ST.filter));
  $('#allReadBtn').classList.toggle('hidden', !!ST.search);
  if (skeleton){ el.innerHTML = '<div class="skel"></div>'.repeat(8); return; }
  if (!items.length){
    const msg = ST.search ? ['', 'Aucun résultat', 'Essaie un autre mot, ou cherche « Partout ».'] : ST.filter !== 'all' ? ['', 'Rien ici', 'Aucun message ne correspond à ce filtre.'] : ['', 'Aucun message', 'Ce dossier est vide.'];
    el.innerHTML = `<div class="lempty"><b>${msg[1]}</b><br>${msg[2]}</div>`;
  } else {
    let h = '', g = null;
    for (const i of items){
      if (SET.groups === 'on' && !ST.search){ const gg = grpOf(i.date); if (gg !== g){ g = gg; h += `<div class="grp">${esc(g)}</div>`; } }
      h += itemHTML(i);
    }
    if (ST.more && !ST.search && ST.filter === 'all') h += '<button class="btn ghost more" id="moreBtn">Charger plus de messages</button>';
    el.innerHTML = h;
  }
  renderBulk();
}
function renderBulk(){
  const n = ST.sel.size, show = n > 1 || (ST.selMode && n > 0);
  $('#bulk').classList.toggle('hidden', !show);
  $('#list').classList.toggle('selmode', ST.selMode);
  $('#selModeBtn').classList.toggle('on', ST.selMode);
  if (show){ $('#bulkN').textContent = n + (n > 1 ? ' sélectionnés' : ' sélectionné'); if (n > 1) showMultiView(n); }
}
function updateItemEl(i){ const el = $(`#list .it[data-k="${CSS.escape(i.key)}"]`); if (el) el.outerHTML = itemHTML(i); }

$('#chips').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; ST.filter = b.dataset.f; renderList(); });
$('#list').addEventListener('click', e => {
  if (e.target.closest('#moreBtn')) return loadMore();
  const it = e.target.closest('.it'); if (!it) return;
  const key = it.dataset.k;
  const q = e.target.closest('[data-q]');
  if (q){ e.stopPropagation(); return act(q.dataset.q, [key]); }
  if (e.target.closest('.av') && SET.avatars === 'on' || ST.selMode){ toggleSel(key); return; }
  if (e.shiftKey && ST.anchor){
    const vis = visible().map(i => i.key), a = vis.indexOf(ST.anchor), b = vis.indexOf(key);
    if (a >= 0 && b >= 0){ ST.sel = new Set(vis.slice(Math.min(a, b), Math.max(a, b) + 1)); renderList(); return; }
  }
  if (e.ctrlKey || e.metaKey){ if (!ST.sel.size && ST.open) ST.sel.add(ST.open); toggleSel(key); return; }
  ST.sel = new Set([key]); ST.anchor = key; openMsg(key);
});
$('#list').addEventListener('dblclick', e => { const it = e.target.closest('.it'); if (!it) return; const i = itemOf(it.dataset.k); if (i && (i.draft || (folderOf(i.acc, i.box) || {}).role === 'drafts')) openDraft(i); });
function toggleSel(key){
  ST.sel.has(key) ? ST.sel.delete(key) : ST.sel.add(key); ST.anchor = key;
  if (!ST.sel.size && ST.selMode && false) ST.selMode = false;
  renderList(); if (ST.sel.size <= 1 && !ST.selMode && ST.open) openMsg(ST.open, { keepSel: true });
  if (!ST.sel.size && ST.open == null) showEmptyView();
}
$('#selModeBtn').onclick = () => { ST.selMode = !ST.selMode; if (!ST.selMode) ST.sel.clear(); renderList(); };
$('#allReadBtn').onclick = () => ST.view && markAllRead(ST.view.acc, ST.view.box);
$('#bulk').addEventListener('click', e => {
  const b = e.target.closest('[data-b]'); if (!b) return;
  const keys = [...ST.sel];
  if (b.dataset.b === 'clear'){ ST.sel.clear(); ST.selMode = false; renderList(); if (ST.open) openMsg(ST.open); else showEmptyView(); return; }
  if (b.dataset.b === 'move') return pickFolder(keys, b);
  act(b.dataset.b, keys);
});
/* Toucher : glisser à gauche = archiver, à droite = lu / non lu ; appui long = menu */
(() => {
  let st = null, lp = null;
  const L = $('#list');
  L.addEventListener('touchstart', e => {
    const it = e.target.closest('.it'); if (!it || e.touches.length > 1) return;
    const t = e.touches[0]; st = { it, x: t.clientX, y: t.clientY, dx: 0, on: false };
    clearTimeout(lp); lp = setTimeout(() => { if (st && !st.on && Math.abs(st.dx) < 8){ const r = it.getBoundingClientRect(); st.cancel = true; navigator.vibrate && navigator.vibrate(12); it.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: Math.min(t.clientX, innerWidth - 250), clientY: r.bottom })); } }, 520);
  }, { passive: true });
  L.addEventListener('touchmove', e => {
    if (!st) return; const t = e.touches[0], dx = t.clientX - st.x, dy = t.clientY - st.y; st.dx = dx;
    if (!st.on){ if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)){ clearTimeout(lp); st = null; return; } if (Math.abs(dx) < 12) return;
      clearTimeout(lp); st.on = true; const i = itemOf(st.it.dataset.k);
      const w = document.createElement('div'); w.className = 'swipewrap'; st.it.before(w); w.appendChild(st.it);
      w.insertAdjacentHTML('afterbegin', `<div class="swipebg l">${ic('archive')}<span>${T('Archiver')}</span></div><div class="swipebg r">${ic(i && i.seen ? 'mail' : 'mail-open')}<span>${T(i && i.seen ? 'Non lus' : 'Lu')}</span></div>`);
      st.wrap = w; st.it.classList.add('swiping'); }
    st.wrap.querySelector('.l').style.opacity = dx < 0 ? 1 : 0; st.wrap.querySelector('.r').style.opacity = dx > 0 ? 1 : 0;
    st.it.style.transform = `translateX(${dx}px)`;
  }, { passive: true });
  const end = () => {
    clearTimeout(lp); if (!st) return; const s0 = st; st = null;
    if (!s0.on) return;
    const key = s0.it.dataset.k, dx = s0.dx, wrap = s0.wrap, it = s0.it;
    it.classList.remove('swiping'); it.style.transition = 'transform .2s';
    const done = () => { if (wrap.isConnected){ wrap.before(it); wrap.remove(); } it.style.transform = ''; it.style.transition = ''; };
    if (dx < -90){ it.style.transform = 'translateX(-110%)'; setTimeout(() => { done(); act('archive', [key]); }, 180); }
    else if (dx > 90){ const i = itemOf(key); it.style.transform = 'translateX(0)'; setTimeout(() => { done(); act(i && i.seen ? 'unread' : 'read', [key]); }, 200); }
    else { it.style.transform = 'translateX(0)'; setTimeout(done, 210); }
  };
  L.addEventListener('touchend', end); L.addEventListener('touchcancel', end);
  L.addEventListener('click', e => { if (st && st.cancel) { e.stopPropagation(); e.preventDefault(); } }, true);
})();
$('#list').addEventListener('contextmenu', e => {
  const it = e.target.closest('.it'); if (!it) return; e.preventDefault();
  const key = it.dataset.k; if (!ST.sel.has(key)){ ST.sel = new Set([key]); renderList(); }
  const keys = [...ST.sel], i = itemOf(key), multi = keys.length > 1;
  menu([
    !multi ? { ic:'eye', label:'Ouvrir', fn: () => openMsg(key) } : null,
    !multi ? { ic:'reply', label:'Répondre', kbd:'R', fn: () => replyTo(key, 'reply') } : null,
    !multi ? { ic:'reply-all', label:'Répondre à tous', kbd:'A', fn: () => replyTo(key, 'all') } : null,
    !multi ? { ic:'forward', label:'Transférer', kbd:'F', fn: () => replyTo(key, 'fwd') } : null,
    !multi ? '-' : null,
    { ic: i.seen ? 'mail' : 'mail-open', label: i.seen ? 'Marquer comme non lu' : 'Marquer comme lu', kbd:'U', fn: () => act(i.seen ? 'unread' : 'read', keys) },
    { ic:'star', label: i.flagged ? 'Ne plus suivre' : 'Suivre', kbd:'S', fn: () => act(i.flagged ? 'unstar' : 'star', keys) },
    '-',
    { ic:'archive', label:'Archiver', kbd:'E', fn: () => act('archive', keys) },
    { ic:'folder-in', label:'Déplacer vers…', kbd:'V', fn: () => pickFolder(keys, null, e.clientX, e.clientY) },
    { ic:'junk', label:'Indésirable', fn: () => act('junk', keys) },
    ...(!multi && i.from && i.from[0] ? blockItems(i.from[0].address) : []),
    { ic:'trash', label:'Supprimer', kbd:'Suppr', red: true, fn: () => act('trash', keys) }
  ], e.clientX, e.clientY);
});
let DRAG = null;
$('#list').addEventListener('dragstart', e => {
  const it = e.target.closest('.it'); if (!it) return;
  if (!ST.sel.has(it.dataset.k)){ ST.sel = new Set([it.dataset.k]); }
  DRAG = [...ST.sel];
  e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', DRAG.length + ' message(s)');
  const g = document.createElement('div'); g.className = 'toast'; g.style.cssText = 'position:fixed;top:-100px;left:0'; g.textContent = `${plural(DRAG.length, 'message')}`; document.body.appendChild(g);
  e.dataTransfer.setDragImage(g, 20, 20); setTimeout(() => g.remove(), 0);
});
$('#list').addEventListener('dragend', () => { DRAG = null; document.querySelectorAll('.fold.drop').forEach(f => f.classList.remove('drop')); });

/** Sélecteur de dossier (Déplacer vers…) */
function pickFolder(keys, btn, x, y){
  const accs = [...new Set(keys.map(k => k.split('|')[0]))];
  if (accs.length > 1) return toast('Déplacer : choisis des messages d’un seul compte');
  const acc = accs[0], cur = keys[0].split('|')[1];
  closeMenu();
  const el = document.createElement('div'); el.className = 'fpick';
  const fl = (ST.folders[acc] || []).filter(f => f.path !== cur);
  el.innerHTML = `<input class="field" placeholder="Déplacer vers…" spellcheck="false"><div class="fpl">${fl.map(f => `<button class="fold" data-p="${esc(f.path)}" style="padding-left:${10 + f.depth * 14}px">${ic(ROLE_IC[f.role] || 'folder')}<span class="t"${f.role ? '' : ' data-notr'}>${esc(f.name)}</span></button>`).join('')}</div>`;
  if (btn){ const r = btn.getBoundingClientRect(); x = r.left; y = r.bottom + 4; }
  menuEl = el; popAt(el, x || innerWidth / 2 - 140, y || 120);
  const inp = el.querySelector('input');
  inp.oninput = () => { const q = inp.value.toLowerCase(); el.querySelectorAll('[data-p]').forEach(b => b.style.display = b.textContent.toLowerCase().includes(q) ? '' : 'none'); };
  inp.onkeydown = e => { e.stopPropagation(); if (e.key === 'Escape') closeMenu(); if (e.key === 'Enter'){ const b = [...el.querySelectorAll('[data-p]')].find(b => b.style.display !== 'none'); b && b.click(); } };
  el.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { closeMenu(); act('move', keys, b.dataset.p); });
  setTimeout(() => { document.addEventListener('mousedown', menuOut, true); inp.focus(); }, 0);
}

/* ================= Expéditeurs bloqués → Indésirables ================= */
const PUBLIC_DOMAINS = new Set(['gmail.com','googlemail.com','outlook.com','outlook.fr','hotmail.com','hotmail.fr','live.com','live.fr','msn.com','icloud.com','me.com','mac.com','yahoo.com','yahoo.fr','ymail.com','orange.fr','wanadoo.fr','free.fr','sfr.fr','neuf.fr','laposte.net','gmx.com','gmx.fr','gmx.net','proton.me','protonmail.com','aol.com','bbox.fr']);
const isBlockedAddr = a => { a = String(a || '').toLowerCase(); return !!a && (ST.blocked.includes(a) || ST.blocked.includes('@' + a.split('@').pop())); };
const blockItems = sender => { const a = String(sender || '').toLowerCase(); return [
  isBlockedAddr(a) ? { ic:'ban', label: `Débloquer ${ST.blocked.includes(a) ? a : '@' + a.split('@').pop()}`, fn: () => unblockSender(ST.blocked.includes(a) ? a : '@' + a.split('@').pop()) } : { ic:'ban', label: `Bloquer ${a}`, red: true, disabled: !a || myAddrs().has(a), fn: () => blockSender(a) },
  !isBlockedAddr(a) && a && !PUBLIC_DOMAINS.has(a.split('@').pop()) ? { ic:'ban', label: `Bloquer tout le domaine @${a.split('@').pop()}`, red: true, fn: () => blockSender('@' + a.split('@').pop()) } : null
]; };
async function blockSender(entry, ask = true){
  entry = String(entry || '').trim().toLowerCase(); if (!entry) return;
  const dom = entry.startsWith('@');
  if (ask && !await confirmBox(`Bloquer ${entry} ?`, dom ? 'Tous les messages de ce domaine iront directement dans Indésirables, sans notification. Ceux déjà reçus y seront aussi déplacés.' : 'Ses messages iront directement dans Indésirables, sans notification. Ceux déjà reçus y seront aussi déplacés.', 'Bloquer', true)) return false;
  try {
    const r = await N.block.add(entry); ST.blocked = r.blocked;
    // retrait immédiat de la liste (boîtes de réception)
    const gone = ST.items.filter(i => (folderOf(i.acc, i.box) || {}).role === 'inbox' && i.from && i.from[0] && isBlockedAddr(i.from[0].address)).map(i => i.key);
    if (gone.length){ const nxt = nextAfter(gone); ST.items = ST.items.filter(i => !gone.includes(i.key)); gone.forEach(k => ST.sel.delete(k)); if (ST.open && gone.includes(ST.open)){ ST.open = null; if (nxt) openMsg(nxt); else { showEmptyView(); document.documentElement.classList.remove('reading'); } } renderList(); }
    else if (ST.msg) renderView(ST.msg);
    const n = r.moved;
    toast(n > 1 ? `${r.entry} bloqué · ${n} messages déplacés dans Indésirables` : n === 1 ? `${r.entry} bloqué · 1 message déplacé dans Indésirables` : `${r.entry} bloqué`, { label: 'Annuler', fn: () => unblockSender(r.entry) });
    loadAllFolders();
    return true;
  } catch (e) { errToast(e); return false; }
}
async function unblockSender(entry){
  try { ST.blocked = await N.block.remove(entry); toast(`${entry} débloqué`); if (ST.msg) renderView(ST.msg); if (blockPaint) blockPaint(); } catch (e) { errToast(e); }
}
let blockPaint = null;

/* ================= Actions (optimistes, avec Annuler) ================= */
function groupKeys(keys){
  const g = new Map();
  for (const k of keys){ const [acc, box, uid] = [k.split('|')[0], k.split('|').slice(1, -1).join('|'), +k.split('|').pop()]; const gk = acc + '\u0000' + box; if (!g.has(gk)) g.set(gk, { acc, box, uids: [] }); g.get(gk).uids.push(uid); }
  return [...g.values()];
}
function nextAfter(keys){
  const vis = visible().map(i => i.key); if (!ST.open || !keys.includes(ST.open)) return ST.open;
  const idx = vis.indexOf(ST.open), rest = vis.filter(k => !keys.includes(k));
  if (SET.after === 'list') return null;
  if (SET.after === 'prev'){ for (let j = idx - 1; j >= 0; j--) if (!keys.includes(vis[j])) return vis[j]; }
  for (let j = idx + 1; j < vis.length; j++) if (!keys.includes(vis[j])) return vis[j];
  for (let j = idx - 1; j >= 0; j--) if (!keys.includes(vis[j])) return vis[j];
  return rest[0] || null;
}
async function act(kind, keys, dest){
  keys = keys.filter(Boolean); if (!keys.length) return;
  const items = keys.map(itemOf).filter(Boolean);
  if (['read','unread','star','unstar'].includes(kind)){
    const f = { read:{ seen:true }, unread:{ seen:false }, star:{ flagged:true }, unstar:{ flagged:false } }[kind];
    items.forEach(i => { if ('seen' in f && i.seen !== f.seen) bumpUnseen(i.acc, i.box, f.seen ? -1 : 1); Object.assign(i, f); updateItemEl(i); });
    if (ST.msg && keys.includes(ST.msg.key)){ Object.assign(ST.msg, f); renderViewBar(); }
    try { await Promise.all(groupKeys(keys).map(g => N.mail.flags(g.acc, g.box, g.uids, f))); }
    catch (e) { errToast(e); refreshList(); }
    return;
  }
  // déplacements : archiver, supprimer, indésirable, déplacer
  const role = { archive:'archive', trash:'trash', junk:'junk' }[kind];
  const groups = groupKeys(keys);
  if (kind === 'trash' && groups.every(g => (folderOf(g.acc, g.box) || {}).role === 'trash')){
    if (!await confirmBox('Supprimer définitivement ?', `${plural(keys.length, 'message')} ser${keys.length > 1 ? 'ont' : 'a'} effacé${keys.length > 1 ? 's' : ''} pour de bon.`, 'Supprimer', true)) return;
  }
  const nxt = nextAfter(keys);
  const removed = items.slice();
  ST.items = ST.items.filter(i => !keys.includes(i.key)); keys.forEach(k => ST.sel.delete(k));
  items.forEach(i => { if (!i.seen) bumpUnseen(i.acc, i.box, -1); });
  if (ST.open && keys.includes(ST.open)){ ST.open = null; if (nxt) openMsg(nxt); else { showEmptyView(); document.documentElement.classList.remove('reading'); } }
  renderList();
  try {
    const res = await Promise.all(groups.map(g => role ? N.mail.role(g.acc, g.box, g.uids, role) : N.mail.move(g.acc, g.box, g.uids, dest)));
    const LB = { archive:['archivé','archivés'], trash:['supprimé','supprimés'], junk:['marqué indésirable','marqués indésirables'], move:['déplacé','déplacés'] }[kind];
    const n = keys.length, txt = n > 1 ? `${n} messages ${LB[1]}` : `Message ${LB[0]}`;
    const undoable = res.every(r => r && r.uidMap && Object.keys(r.uidMap).length);
    toast(kind === 'move' ? `${txt} vers « ${(folderOf(groups[0].acc, dest) || {}).name || dest} »` : txt, undoable ? { label:'Annuler', fn: async () => {
      try {
        await Promise.all(groups.map((g, j) => N.mail.move(g.acc, res[j].dest, Object.values(res[j].uidMap), g.box)));
        toast('Restauré'); refreshList(); groups.forEach(g => refreshFoldersSoon(g.acc, 300));
      } catch (e) { errToast(e); }
    } } : null);
    groups.forEach(g => refreshFoldersSoon(g.acc));
  } catch (e) {
    errToast(e); ST.items.push(...removed); ST.items.sort((a, b) => new Date(b.date) - new Date(a.date)); renderList(); refreshList();
  }
}

/* ================= Lecture d’un message ================= */
const IMG_OK = new Set(J('hamama-img-ok', []));
let openTok = 0, readT = null;
function showEmptyView(){
  ST.msg = null;
  $('#view').innerHTML = `<div class="vempty" style="height:100%"><div><div class="big">${ic('mail-open')}</div><h3>Aucun message sélectionné</h3><div>Choisis un message dans la liste pour le lire ici.</div>
    ${SET.keys === 'on' ? `<div class="keys"><span><kbd class="k">N</kbd> nouveau</span><span><kbd class="k">J</kbd> <kbd class="k">K</kbd> naviguer</span><span><kbd class="k">R</kbd> répondre</span><span><kbd class="k">E</kbd> archiver</span><span><kbd class="k">?</kbd> tous les raccourcis</span></div>` : ''}</div></div>`;
}
function showMultiView(n){
  $('#view').innerHTML = `<div class="vempty" style="height:100%"><div><div class="big">${ic('square-check')}</div><h3>${n} messages sélectionnés</h3><div>Utilise la barre au-dessus de la liste, ou :</div>
    <div class="row" style="justify-content:center;margin-top:18px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn ghost" data-m="read">${ic('mail-open')}Lu</button><button class="btn ghost" data-m="archive">${ic('archive')}Archiver</button><button class="btn ghost" data-m="trash">${ic('trash')}Supprimer</button></div></div></div>`;
  $('#view').querySelectorAll('[data-m]').forEach(b => b.onclick = () => act(b.dataset.m, [...ST.sel]));
}
const mailIsDark = () => SET.mailbg === 'theme' && SET.theme !== 'clair';
// intensité d'inversion pour que le blanc du message devienne exactement le fond de l'appli
function mailInv(){
  const c = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim().replace('#', '');
  const h = c.length === 3 ? c.split('').map(x => x + x).join('') : c;
  const v = h.length === 6 ? (parseInt(h.slice(0, 2), 16) + parseInt(h.slice(2, 4), 16) + parseInt(h.slice(4, 6), 16)) / 765 : .15;
  return (1 - v).toFixed(3);
}
function sanitizeMailHtml(html){
  const d = new DOMParser().parseFromString(html, 'text/html');
  d.querySelectorAll('script,meta,base,iframe,frame,frameset,object,embed,applet,form button[type=submit],link[rel=import],noscript').forEach(n => n.remove());
  d.querySelectorAll('*').forEach(n => { for (const a of [...n.attributes]){ if (/^on/i.test(a.name) || (/^(href|src|action|formaction|xlink:href)$/i.test(a.name) && /^\s*(javascript|vbscript|file):/i.test(a.value))) n.removeAttribute(a.name); } });
  d.querySelectorAll('form').forEach(f => { f.removeAttribute('action'); f.setAttribute('onsubmit', ''); f.removeAttribute('onsubmit'); });
  const styles = [...d.querySelectorAll('style')].map(s => s.outerHTML).join('');
  d.querySelectorAll('style').forEach(s => s.remove());
  return { styles, body: d.body ? d.body.innerHTML : '' };
}
const linkify = s => esc(s).replace(/(https?:\/\/[^\s<>"']+[^\s<>"'.,;:!?)\]])/g, '<a href="$1">$1</a>').replace(/(^|\n)(&gt;[^\n]*)/g, '$1<span style="color:#777">$2</span>');
function mailDoc(m, allowImg){
  const csp = allowImg ? "default-src 'none'; img-src data: blob: https: http:; style-src 'unsafe-inline' https:; font-src data: https:; media-src data: https:"
                       : "default-src 'none'; img-src data: blob:; style-src 'unsafe-inline'; font-src data:";
  const dark = mailIsDark();
  let styles = '', body = '';
  if (m.html){ const s = sanitizeMailHtml(m.html); styles = s.styles; body = s.body; }
  else body = `<div style="white-space:pre-wrap;font-family:inherit">${linkify(m.text || '')}</div>`;
  const z = (+SET.mailZoom || 100) / 100, flat = SET.mailbg === 'theme', inv = dark ? mailInv() : 1;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${csp}"><base target="_blank">${styles}
<style>html{zoom:${z}}body{margin:0;padding:${flat ? '6px 2px 18px' : '22px 26px'};font:14px/1.6 ${uiFont()},Inter,"Segoe UI",Arial,sans-serif;color:#1d1d1f;background:${dark ? '#fff' : 'transparent'};word-wrap:break-word;overflow-wrap:anywhere;overflow-x:auto}
img{max-width:100%;height:auto}pre{white-space:pre-wrap}a{color:#1a73e8}blockquote{margin:8px 0;padding-left:12px;border-left:3px solid #d0d4dc;color:#555}table{max-width:100%}
${dark ? `html{filter:invert(${inv}) hue-rotate(180deg)}img,video,picture,[style*="background-image"]{filter:invert(1) hue-rotate(180deg)}` : ''}</style></head><body>${body}</body></html>`;
}
function hasRemote(m){ return !!m.html && /<img[^>]+src\s*=\s*["']?\s*https?:|url\(\s*["']?https?:|<link[^>]+href\s*=\s*["']?https?:/i.test(m.html); }
async function openMsg(key, { keepSel = false } = {}){
  const i = itemOf(key); if (!i) return;
  if (i.draft || (folderOf(i.acc, i.box) || {}).role === 'drafts') { ST.open = key; renderList(); return openDraft(i); }
  ST.open = key; if (!keepSel){ ST.sel = new Set([key]); }
  document.documentElement.classList.add('reading');
  $('#list').querySelectorAll('.it.on').forEach(e => e.classList.remove('on'));
  const el = $(`#list .it[data-k="${CSS.escape(key)}"]`); if (el){ el.classList.add('on'); el.scrollIntoView({ block:'nearest' }); }
  renderBulk();
  const tok = ++openTok; clearTimeout(readT);
  // affichage immédiat de l’en-tête, le corps arrive ensuite
  renderView({ ...i, loading: true });
  const markNow = SET.markRead === 'now';
  try {
    const m = await N.mail.get(i.acc, i.box, i.uid, { markSeen: markNow });
    if (tok !== openTok) return;
    m.key = key; ST.msg = m;
    if (!i.seen && markNow){ i.seen = true; bumpUnseen(i.acc, i.box, -1); updateItemEl(i); markOn(key); }
    else if (!i.seen && SET.markRead === 'delay') readT = setTimeout(() => { if (ST.open === key && !i.seen) act('read', [key]); }, 2000);
    (m.from || []).forEach(a => learn(a, 0.3));
    renderView(m);
  } catch (e) {
    if (tok !== openTok) return;
    $('#view').innerHTML = `<div class="vempty" style="height:100%"><div><div class="big">${ic('junk')}</div><h3>Impossible d’ouvrir ce message</h3><div>${esc(cleanErr(e))}</div><div class="row" style="justify-content:center;margin-top:16px;display:flex"><button class="btn ghost" id="retryOpen">${ic('refresh')}Réessayer</button></div></div></div>`;
    $('#retryOpen').onclick = () => openMsg(key);
  }
}
const markOn = key => { const el = $(`#list .it[data-k="${CSS.escape(key)}"]`); if (el) el.classList.add('on'); };
function renderViewBar(){
  const m = ST.msg; const b = $('.vbar [data-v=star]'); if (!m || !b) return;
  b.classList.toggle('starred', !!m.flagged); b.dataset.tip = m.flagged ? 'Ne plus suivre (S)' : 'Suivre (S)';
}
function renderView(m){
  const a = accOf(m.acc), from = (m.from || [])[0] || {}, role = (folderOf(m.acc, m.box) || {}).role;
  const to = (m.to || []).map(x => `<span class="addr" data-notr data-addr="${esc(x.address)}" title="${esc(x.address)}">${esc(nameOf(x))}</span>`).join(', ');
  const cc = (m.cc || []).map(x => `<span class="addr" data-notr data-addr="${esc(x.address)}" title="${esc(x.address)}">${esc(nameOf(x))}</span>`).join(', ');
  const allowImg = SET.images === 'always' || IMG_OK.has((from.address || '').toLowerCase()) || m._imgs;
  const blocked = !m.loading && !allowImg && hasRemote(m);
  const atts = (m.attachments || []);
  $('#view').innerHTML = `
  <div class="vbar">
    <button class="ibtn backBtn" data-v="back" title="Retour à la liste (Échap)">${ic('left')}</button>
    <button class="btn" data-v="reply" title="Répondre (R)">${ic('reply')}<span class="lbl-t">Répondre</span></button>
    <button class="btn" data-v="all" title="Répondre à tous (A)">${ic('reply-all')}<span class="lbl-t">Rép. à tous</span></button>
    <button class="btn" data-v="fwd" title="Transférer (F)">${ic('forward')}<span class="lbl-t">Transférer</span></button>
    <div class="sep"></div>
    <button class="ibtn" data-v="archive" title="Archiver (E)">${ic('archive')}</button>
    <button class="ibtn" data-v="trash" title="Supprimer (Suppr)">${ic('trash')}</button>
    <button class="ibtn" data-v="move" title="Déplacer vers… (V)">${ic('folder-in')}</button>
    <div class="spacer"></div>
    <button class="ibtn${m.flagged ? ' starred' : ''}" data-v="star" title="${m.flagged ? 'Ne plus suivre' : 'Suivre'} (S)">${ic('star')}</button>
    <button class="ibtn" data-v="unread" title="Marquer comme non lu (U)">${ic('mail')}</button>
    <button class="ibtn" data-v="more" title="Plus d’actions">${ic('dots')}</button>
  </div>
  <div id="vscroll" style="flex:1;overflow:auto">
  <div class="vin">
    <h1><span${m.subject ? ' data-notr' : ''}>${esc(m.subject || '(sans objet)')}</span>${ST.view && ST.view.uni && a ? `<span class="tag" style="border-color:${accColor(a)};color:${accColor(a)}">${esc(accLabel(a))}</span>` : ''}</h1>
    <div class="who">${avatar(from)}<div class="wi"><div class="wn"><span${nameOf(from) ? ' data-notr' : ''}>${esc(nameOf(from) || '(inconnu)')}</span><span class="addr" data-notr data-addr="${esc(from.address || '')}">&lt;${esc(from.address || '')}&gt;</span></div>
      <div class="wt">À : <b>${to || '—'}</b>${cc ? ` · Cc : <b>${cc}</b>` : ''}</div></div><div class="wd" title="${esc(fmtLong(m.date))}">${esc(new Date(m.date).toLocaleString(LOC, { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }))}</div></div>
    ${blocked ? `<div class="banner">${ic('shield')}<span>Images distantes bloquées pour protéger ta vie privée (pixels espions).</span><button data-img="once">Afficher</button><button data-img="always">Toujours pour cet expéditeur</button></div>` : ''}
    ${!m.loading && from.address && isBlockedAddr(from.address) ? `<div class="banner">${ic('ban')}<span>Cet expéditeur est bloqué : ses messages vont dans Indésirables.</span><button data-unblock>Débloquer</button></div>` : ''}
    ${m.unsubscribe && /^https?:/i.test(m.unsubscribe) ? `<div class="banner">${ic('ban')}<span>Lettre d’information</span><button data-unsub>Se désabonner</button></div>` : ''}
    ${atts.length ? `<div class="atts">${atts.map(x => `<div class="att" data-att="${esc(x.key)}" title="Ouvrir"><div class="ai">${esc((x.filename.split('.').pop() || '').slice(0, 4))}</div><div class="an"><b data-notr>${esc(x.filename)}</b><small>${fmtSize(x.size)}</small></div><button class="ibtn" data-save="${esc(x.key)}" title="Enregistrer">${ic('download')}</button></div>`).join('')}${atts.length > 1 ? `<button class="btn ghost" data-saveall style="height:48px">${ic('download')}Tout enregistrer</button>` : ''}</div>` : ''}
    <div class="mbody">${m.loading ? `<div style="padding:22px">${'<div class="skel" style="height:14px;margin-bottom:10px"></div>'.repeat(5)}</div>` : '<iframe id="mframe" sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox" aria-label="Contenu du message"></iframe>'}</div>
    ${!m.loading && role !== 'sent' ? `<div class="qreply"><button data-v="reply">${ic('reply')}Répondre à ${esc(nameOf(from).split(' ')[0] || 'l’expéditeur')}…</button><button class="sm" data-v="fwd">${ic('forward')}Transférer</button></div>` : ''}
  </div></div>`;
  $('#view').style.display = 'flex'; $('#view').style.flexDirection = 'column';
  if (!m.loading){
    const f = $('#mframe');
    f.srcdoc = mailDoc(m, allowImg);
    f.onload = () => {
      const d = f.contentDocument; if (!d) return;
      const fit = () => { f.style.height = Math.max(120, d.documentElement.scrollHeight) + 'px'; };
      fit(); try { new ResizeObserver(fit).observe(d.body); } catch {}
      d.querySelectorAll('img').forEach(im => im.addEventListener('load', fit));
      d.addEventListener('keydown', e => onKey(e));
      d.addEventListener('mouseover', e => { const l = e.target.closest && e.target.closest('a[href]'); showLink(l ? l.href : ''); });
      d.addEventListener('mouseout', () => showLink(''));
      d.addEventListener('click', e => { const l = e.target.closest && e.target.closest('a[href]'); if (l && /^mailto:/i.test(l.href)){ e.preventDefault(); composeMailto(l.href); } });
      d.addEventListener('contextmenu', e => { const l = e.target.closest && e.target.closest('a[href]'); if (l){ e.preventDefault(); const r = f.getBoundingClientRect(), z = document.body.style.zoom || 1; menu([{ ic:'ext', label:'Ouvrir le lien', fn: () => window.open(l.href) }, { ic:'copy', label:'Copier le lien', fn: () => navigator.clipboard.writeText(l.href).then(() => toast('Lien copié')) }], r.left + e.clientX * (+SET.mailZoom/100), r.top + e.clientY * (+SET.mailZoom/100)); } });
    };
  }
  const V = $('#view');
  V.querySelectorAll('[data-v]').forEach(b => b.onclick = ev => viewAction(b.dataset.v, b, ev));
  V.querySelectorAll('[data-img]').forEach(b => b.onclick = () => {
    if (b.dataset.img === 'always'){ IMG_OK.add((from.address || '').toLowerCase()); store.set('hamama-img-ok', JSON.stringify([...IMG_OK])); }
    m._imgs = true; renderView(m);
  });
  const ubk = V.querySelector('[data-unblock]'); if (ubk) ubk.onclick = () => unblockSender(ST.blocked.includes((from.address || '').toLowerCase()) ? from.address.toLowerCase() : '@' + (from.address || '').toLowerCase().split('@').pop());
  const un = V.querySelector('[data-unsub]'); if (un) un.onclick = () => { window.open(m.unsubscribe); };
  V.querySelectorAll('[data-att]').forEach(d => d.onclick = async e => {
    if (e.target.closest('[data-save]')) return;
    try { const r = await N.att.open(d.dataset.att); if (r && r.save) N.att.save([d.dataset.att]).catch(errToast); } catch (err) { errToast(err); }
  });
  V.querySelectorAll('[data-save]').forEach(b => b.onclick = async () => { try { const p = await N.att.save([b.dataset.save]); if (p) toast('Enregistré'); } catch (e) { errToast(e); } });
  const sa = V.querySelector('[data-saveall]'); if (sa) sa.onclick = async () => { try { const p = await N.att.save(atts.map(x => x.key)); if (p) toast('Pièces jointes enregistrées'); } catch (e) { errToast(e); } };
  V.querySelectorAll('.addr[data-addr]').forEach(s => s.onclick = e => {
    const ad = s.dataset.addr;
    menu([{ ic:'pen', label:'Écrire à ' + ad, fn: () => openComposer({ to: [{ address: ad, name: '' }] }) }, { ic:'copy', label:'Copier l’adresse', fn: () => navigator.clipboard.writeText(ad).then(() => toast('Adresse copiée')) }], e.clientX, e.clientY + 8);
  });
}
let linkEl = null;
function showLink(url){
  if (!linkEl){ linkEl = document.createElement('div'); linkEl.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:70;max-width:60vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;background:var(--panel);border:1px solid var(--line2);color:var(--muted);font-size:12px;padding:4px 9px;border-radius:7px;pointer-events:none;box-shadow:0 4px 14px var(--shade)'; document.body.appendChild(linkEl); }
  linkEl.textContent = url; linkEl.style.display = url && /^https?:/i.test(url) ? 'block' : 'none';
}
async function viewAction(v, btn, ev){
  const m = ST.msg; const key = ST.open;
  if (v === 'back'){ document.documentElement.classList.remove('reading'); ST.open = null; showEmptyView(); renderList(); return; }
  if (!key) return;
  if (v === 'reply' || v === 'all' || v === 'fwd') return replyTo(key, v === 'all' ? 'all' : v);
  if (v === 'archive' || v === 'trash') return act(v, [key]);
  if (v === 'move') return pickFolder([key], btn);
  if (v === 'star') return act(m && m.flagged ? 'unstar' : 'star', [key]);
  if (v === 'unread'){ await act('unread', [key]); clearTimeout(readT); return; }
  if (v === 'more') return menuBelow(btn, [
    { ic:'junk', label:'Signaler comme indésirable', fn: () => act('junk', [key]) },
    ...(m && m.from && m.from[0] ? blockItems(m.from[0].address) : []),
    MOBILE ? null : { ic:'print', label:'Imprimer', kbd:'Ctrl P', fn: printMsg },
    { ic:'code', label:'Afficher la source', fn: showSource },
    '-',
    { ic:'image', label: SET.images === 'always' ? 'Images : toujours affichées' : 'Afficher les images', disabled: !m || SET.images === 'always', fn: () => { m._imgs = true; renderView(m); } },
    { ic:'copy', label:'Copier l’adresse de l’expéditeur', fn: () => navigator.clipboard.writeText(((m.from || [])[0] || {}).address || '').then(() => toast('Adresse copiée')) },
  ]);
}
function printMsg(){
  const m = ST.msg; if (!m) return;
  const head = `<div style="font:13px Arial;border-bottom:1px solid #ccc;padding-bottom:10px;margin-bottom:14px"><h2 style="margin:0 0 6px">${esc(m.subject)}</h2><b>De :</b> ${esc((m.from || []).map(fmtAddr).join(', '))}<br><b>À :</b> ${esc((m.to || []).map(fmtAddr).join(', '))}<br><b>Date :</b> ${esc(fmtLong(m.date))}</div>`;
  const s = m.html ? sanitizeMailHtml(m.html) : { styles: '', body: `<pre style="white-space:pre-wrap;font:14px Arial">${esc(m.text)}</pre>` };
  N.print(`<!DOCTYPE html><html><head><meta charset="utf-8">${s.styles}</head><body style="font-family:Arial">${head}${s.body}</body></html>`).catch(errToast);
}
async function showSource(){
  const i = itemOf(ST.open); if (!i) return;
  try { const src = await N.mail.source(i.acc, i.box, i.uid);
    modal(`<h2>${ic('code')} Source du message</h2><textarea class="field" readonly style="height:60vh;font:12px/1.5 Consolas,monospace;white-space:pre">${esc(src)}</textarea><div class="row"><button class="btn ghost" data-c>Copier</button><button class="btn primary" data-x>Fermer</button></div>`,
      (c, close) => { c.querySelector('[data-x]').onclick = () => close(); c.querySelector('[data-c]').onclick = () => navigator.clipboard.writeText(src).then(() => toast('Copié')); }, { cls: 'wide' });
  } catch (e) { errToast(e); }
}

/* ================= Rédaction ================= */
let CMP = null;           // état du message en cours
let saveLocalT = null;
const FONTS = { 'Inter':'Inter, Segoe UI, Arial, sans-serif', 'Arial':'Arial, Helvetica, sans-serif', 'Segoe UI':'"Segoe UI", Arial, sans-serif', 'Verdana':'Verdana, Geneva, sans-serif', 'Georgia':'Georgia, serif', 'Times New Roman':'"Times New Roman", serif', 'Courier New':'"Courier New", monospace' };
const parseAddrs = s => String(s || '').split(/[,;]+/).map(x => x.trim()).filter(Boolean).map(x => { const m = x.match(/^"?([^"<]*?)"?\s*<([^>]+)>$/); return m ? { name: m[1].trim(), address: m[2].trim() } : { name: '', address: x }; });
const validAddr = a => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(a.address);
const sigHTML = acc => { const a = accOf(acc); return a && a.signature ? `<div class="sig" data-sig="1"><br>${a.signature}</div>` : ''; };
const reSubj = (p, s) => { if (new RegExp('^(re|rép|réf|aw|r|tr|fwd?|wg|rv|enc|i)\\s*:', 'i').test(s || '')) return s; const pre = p === 'Re' ? (LANG === 'de' ? 'AW' : 'Re') : ({ fr:'Tr', en:'Fwd', es:'RV', de:'WG', it:'I', pt:'Enc', ar:'Fwd' }[LANG]); return LANG === 'fr' ? `${pre} : ${s || ''}` : `${pre}: ${s || ''}`; };

/** Nettoie du HTML étranger avant de l’insérer dans l’éditeur (liste blanche) */
const OK_TAGS = new Set('A ABBR B BLOCKQUOTE BR CAPTION CENTER CODE COL COLGROUP DD DIV DL DT EM FONT H1 H2 H3 H4 H5 H6 HR I IMG LI OL P PRE S SMALL SPAN STRIKE STRONG SUB SUP TABLE TBODY TD TFOOT TH THEAD TR U UL'.split(' '));
const OK_ATTR = new Set(['href','src','alt','title','width','height','style','align','valign','colspan','rowspan','cellpadding','cellspacing','border','color','face','size','bgcolor','dir']);
function cleanForEditor(html, allowRemote){
  const d = new DOMParser().parseFromString(html, 'text/html');
  const walk = n => {
    for (const c of [...n.childNodes]){
      if (c.nodeType === 8){ c.remove(); continue; }
      if (c.nodeType !== 1) continue;
      if (!OK_TAGS.has(c.tagName)){
        if (/^(SCRIPT|STYLE|HEAD|TITLE|META|LINK|IFRAME|OBJECT|EMBED|SVG|MATH|TEMPLATE|NOSCRIPT|FORM|INPUT|BUTTON|SELECT|TEXTAREA)$/.test(c.tagName)){ c.remove(); continue; }
        walk(c); c.replaceWith(...c.childNodes); continue;
      }
      for (const a of [...c.attributes]){
        const nm = a.name.toLowerCase();
        if (!OK_ATTR.has(nm)){ c.removeAttribute(a.name); continue; }
        if ((nm === 'href') && !/^(https?:|mailto:|#)/i.test(a.value.trim())) c.removeAttribute(a.name);
        if (nm === 'src' && !(/^data:image\//i.test(a.value.trim()) || (allowRemote && /^https?:/i.test(a.value.trim())))) c.removeAttribute(a.name);
        if (nm === 'style') c.setAttribute('style', a.value.replace(/url\s*\([^)]*\)|expression\s*\(|behavior\s*:|-moz-binding|position\s*:\s*(fixed|absolute)/gi, ''));
      }
      if (c.tagName === 'A') c.setAttribute('target', '_blank');
      walk(c);
    }
  };
  walk(d.body);
  return d.body.innerHTML;
}

function quoteBlock(m){
  const from = (m.from || [])[0] || {};
  const Q = { fr:'Le {d}, {n} a écrit :', en:'On {d}, {n} wrote:', es:'El {d}, {n} escribió:', de:'Am {d} schrieb {n}:', it:'Il giorno {d}, {n} ha scritto:', pt:'Em {d}, {n} escreveu:', ar:'في {d}، كتب {n}:' }[LANG];
  const head = Q.replace('{d}', esc(fmtLong(m.date))).replace('{n}', `${esc(nameOf(from))} &lt;${esc(from.address || '')}&gt;`);
  const body = m.html ? cleanForEditor(m.html, false) : esc(m.text || '').replace(/\n/g, '<br>');
  return `<br><div>${head}</div><blockquote type="cite">${body}</blockquote>`;
}
function fwdBlock(m){
  const f = x => esc((x || []).map(fmtAddr).join(', '));
  const body = m.html ? cleanForEditor(m.html, false) : esc(m.text || '').replace(/\n/g, '<br>');
  return `<br><div class="fwdh">---------- ${T('Message transféré')} ----------<br>${T('De :')} ${f(m.from)}<br>${T('Date :')} ${esc(fmtLong(m.date))}<br>${T('Objet :')} ${esc(m.subject)}<br>${T('À :')} ${f(m.to)}${m.cc && m.cc.length ? '<br>' + T('Cc :') + ' ' + f(m.cc) : ''}</div><br><div class="fwd">${body}</div>`;
}
async function replyTo(key, mode){
  const i = itemOf(key); if (!i) return;
  let m = ST.msg && ST.msg.key === key ? ST.msg : null;
  if (!m){ try { m = await N.mail.get(i.acc, i.box, i.uid, { markSeen: false }); m.key = key; } catch (e) { return errToast(e); } }
  const me = myAddrs(), acc = i.acc, a = accOf(acc);
  const fromL = (m.replyTo && m.replyTo.length ? m.replyTo : m.from) || [];
  const role = (folderOf(i.acc, i.box) || {}).role;
  let to = [], cc = [];
  if (mode === 'reply') to = role === 'sent' ? m.to : fromL;
  if (mode === 'all'){
    to = role === 'sent' ? m.to : [...fromL, ...(m.to || []).filter(x => !me.has(x.address.toLowerCase()))];
    cc = (m.cc || []).filter(x => !me.has(x.address.toLowerCase()));
  }
  const dedupe = l => { const s = new Set(); return l.filter(x => x && x.address && !s.has(x.address.toLowerCase()) && s.add(x.address.toLowerCase())); };
  to = dedupe(to); cc = dedupe(cc).filter(x => !to.some(t => t.address.toLowerCase() === x.address.toLowerCase()));
  const fwd = mode === 'fwd';
  openComposer({
    kind: mode === 'fwd' ? 'fwd' : mode === 'all' ? 'all' : 'reply',
    acc: acc && a ? acc : undefined, to, cc,
    subject: fwd ? reSubj('Tr', m.subject) : reSubj('Re', m.subject),
    html: `<p><br></p>${sigHTML(acc)}${fwd ? fwdBlock(m) : quoteBlock(m)}`,
    inReplyTo: fwd ? '' : m.messageId, references: fwd ? [] : [...(m.references || []), m.messageId].filter(Boolean),
    replyRef: fwd ? null : { box: i.box, uid: i.uid },
    atts: fwd ? (m.attachments || []).map(x => ({ name: x.filename, size: x.size, key: x.key })) : [],
    caretTop: true
  });
}
async function openDraft(i){
  try {
    const m = await N.mail.get(i.acc, i.box, i.uid, { markSeen: false });
    openComposer({ acc: i.acc, to: m.to, cc: m.cc, bcc: m.bcc, subject: m.subject, html: m.html ? cleanForEditor(m.html, true) : esc(m.text || '').replace(/\n/g, '<br>'),
      atts: (m.attachments || []).map(x => ({ name: x.filename, size: x.size, key: x.key })), draftUid: i.uid, draftBox: i.box, inReplyTo: m.inReplyTo, references: m.references });
  } catch (e) { errToast(e); }
}
function composeMailto(url){
  try {
    const u = new URL(url), p = u.searchParams;
    const to = parseAddrs(decodeURIComponent(u.pathname || ''));
    openComposer({ to, cc: parseAddrs(p.get('cc')), bcc: parseAddrs(p.get('bcc')), subject: p.get('subject') || '', html: p.get('body') ? esc(p.get('body')).replace(/\n/g, '<br>') : undefined });
  } catch { openComposer({}); }
}

// Fenêtre « Nouveau message » déplaçable par sa barre de titre (position mémorisée)
function composerPlace(el, x, y){
  const r = el.getBoundingClientRect(), hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hh')) || 0;
  x = Math.max(8 - r.width + 120, Math.min(innerWidth - 120, x));          // garde au moins 120 px visibles
  y = Math.max(hh, Math.min(innerHeight - 44, y));                          // barre de titre toujours atteignable
  el.classList.add('moved'); el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.right = 'auto'; el.style.bottom = 'auto';
  return [x, y];
}
function composerDrag(el){
  const small = () => document.documentElement.classList.contains('mobile') || document.documentElement.classList.contains('narrow');
  try { const p = JSON.parse(store.get('hamama-compose-pos') || 'null'); if (p && !small()) requestAnimationFrame(() => composerPlace(el, p[0], p[1])); } catch {}
  try { const z = JSON.parse(store.get('hamama-compose-size') || 'null'); if (z && !small()){ el.style.width = Math.min(z[0], innerWidth - 16) + 'px'; el.style.height = Math.min(z[1], innerHeight - 60) + 'px'; } } catch {}
  // agrandir / réduire par les bords et les coins
  for (const d of ['n','s','e','w','ne','nw','se','sw']){
    const h = document.createElement('div'); h.className = 'rz'; h.dataset.d = d; el.appendChild(h);
    h.addEventListener('pointerdown', e => {
      if (e.button !== 0 || el.classList.contains('max') || el.classList.contains('min') || small()) return;
      e.preventDefault(); e.stopPropagation();
      const r0 = el.getBoundingClientRect(), x0 = e.clientX, y0 = e.clientY, hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hh')) || 0;
      composerPlace(el, r0.left, r0.top);
      h.setPointerCapture(e.pointerId); el.classList.add('dragging');
      const mv = ev => {
        let L = r0.left, Tp = r0.top, W = r0.width, Hh = r0.height;
        const dx = ev.clientX - x0, dy = ev.clientY - y0;
        if (d.includes('e')) W = r0.width + dx;
        if (d.includes('s')) Hh = r0.height + dy;
        if (d.includes('w')){ W = r0.width - dx; }
        if (d.includes('n')){ Hh = r0.height - dy; }
        W = Math.max(440, Math.min(W, innerWidth - 16)); Hh = Math.max(320, Math.min(Hh, innerHeight - hh - 8));
        if (d.includes('w')) L = r0.right - W;
        if (d.includes('n')) Tp = Math.max(hh, r0.bottom - Hh), Hh = r0.bottom - Tp;
        el.style.width = W + 'px'; el.style.height = Hh + 'px'; el.style.left = L + 'px'; el.style.top = Tp + 'px';
      };
      const up = () => {
        h.removeEventListener('pointermove', mv); h.removeEventListener('pointerup', up); h.removeEventListener('pointercancel', up);
        el.classList.remove('dragging');
        const r = el.getBoundingClientRect();
        try { store.set('hamama-compose-size', JSON.stringify([Math.round(r.width), Math.round(r.height)])); store.set('hamama-compose-pos', JSON.stringify([Math.round(r.left), Math.round(r.top)])); } catch {}
      };
      h.addEventListener('pointermove', mv); h.addEventListener('pointerup', up); h.addEventListener('pointercancel', up);
    });
  }
  const head = el.querySelector('.chead');
  head.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('button') || el.classList.contains('max') || small()) return;
    const r = el.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top;
    let moved = false, last = null;
    head.setPointerCapture(e.pointerId);
    const mv = ev => {
      if (!moved && Math.hypot(ev.clientX - e.clientX, ev.clientY - e.clientY) < 4) return;
      moved = true; el.classList.add('dragging');
      last = composerPlace(el, ev.clientX - dx, ev.clientY - dy);
    };
    const up = () => {
      head.removeEventListener('pointermove', mv); head.removeEventListener('pointerup', up); head.removeEventListener('pointercancel', up);
      el.classList.remove('dragging');
      if (last) try { store.set('hamama-compose-pos', JSON.stringify(last)); } catch {}
    };
    head.addEventListener('pointermove', mv); head.addEventListener('pointerup', up); head.addEventListener('pointercancel', up);
  });
  const onRs = () => {
    if (!el.isConnected) return removeEventListener('resize', onRs);
    if (small()){ el.classList.remove('moved'); el.style.left = el.style.top = el.style.right = el.style.bottom = ''; return; }
    let p = null; try { p = JSON.parse(store.get('hamama-compose-pos') || 'null'); } catch {}
    if (el.classList.contains('moved')){ const r = el.getBoundingClientRect(); composerPlace(el, r.left, r.top); }
    else if (p) composerPlace(el, p[0], p[1]);
  };
  addEventListener('resize', onRs);
}

async function openComposer(o = {}){
  if (!ST.accounts.length) return openAddAccount();
  if (CMP && CMP.dirty){
    const el = $('#composer'); el.classList.remove('min');
    if (!await confirmBox('Un message est déjà en cours', 'Enregistrer le brouillon actuel et en commencer un nouveau ?', 'Enregistrer et continuer')) return;
    await closeComposer('save');
  } else if (CMP) closeComposer('discard', true);
  const acc = o.acc || (ST.view && ST.view.acc) || (ST.open && ST.open.split('|')[0]) || ST.accounts[0].id;
  CMP = { kind: o.kind || (o.draftUid ? 'draft' : o.inReplyTo ? 'reply' : 'new'), acc, to: o.to || [], cc: o.cc || [], bcc: o.bcc || [], atts: o.atts || [], inReplyTo: o.inReplyTo || '', references: o.references || [], replyRef: o.replyRef || null, draftUid: o.draftUid || null, draftBox: o.draftBox || null, dirty: false };
  const showCc = CMP.cc.length || CMP.bcc.length;
  const el = document.createElement('div'); el.id = 'composer';
  if (SET.compWin === 'max') el.classList.add('max');
  el.innerHTML = `
    <div class="chead"><b id="cTitle">${{ reply:'Réponse', all:'Réponse à tous', fwd:'Transfert', draft:'Brouillon' }[CMP.kind] || 'Nouveau message'}</b>
      <button class="ibtn" data-c="min" title="Réduire">${ic('min')}</button><button class="ibtn" data-c="max" title="Agrandir">${ic('max')}</button><button class="ibtn" data-c="close" title="Fermer (le brouillon est enregistré)">${ic('x')}</button></div>
    <div class="cbody">
      ${ST.accounts.length > 1 ? `<div class="cf"><label>De</label><select id="cFrom" data-notr>${ST.accounts.map(a => `<option value="${a.id}"${a.id === acc ? ' selected' : ''}>${esc(a.name ? `${a.name} <${a.email}>` : a.email)}</option>`).join('')}</select></div>` : ''}
      <div class="cf"><label>À</label><div class="toks" data-f="to"><input autocomplete="off" spellcheck="false"></div>${showCc ? '' : '<button class="ccb" data-cc>Cc / Cci</button>'}</div>
      <div class="cf${showCc ? '' : ' hidden'}" data-ccrow><label>Cc</label><div class="toks" data-f="cc"><input autocomplete="off" spellcheck="false"></div></div>
      <div class="cf${showCc ? '' : ' hidden'}" data-ccrow><label>Cci</label><div class="toks" data-f="bcc"><input autocomplete="off" spellcheck="false"></div></div>
      <div class="cf"><label>Objet</label><input class="plain" id="cSubj" value="${esc(o.subject || '')}" placeholder="Objet du message"></div>
      <div class="etools">
        <button class="attb" id="cAttach" title="Joindre des fichiers">${ic('clip')}<span>Joindre</span></button>
        <div class="sep"></div>
        <select id="eFont" title="Police">${Object.keys(FONTS).map(f => `<option${f === SET.font ? ' selected' : ''}>${f}</option>`).join('')}</select>
        <select id="eSize" title="Taille"><option value="2">Petit</option><option value="3" selected>Normal</option><option value="4">Grand</option><option value="5">Très grand</option></select>
        <div class="sep"></div>
        <button class="ibtn" data-e="bold" title="Gras (Ctrl B)">${ic('bold')}</button><button class="ibtn" data-e="italic" title="Italique (Ctrl I)">${ic('italic')}</button><button class="ibtn" data-e="underline" title="Souligné (Ctrl U)">${ic('underline')}</button><button class="ibtn" data-e="strikeThrough" title="Barré">${ic('strike')}</button>
        <label class="ibtn" title="Couleur du texte" style="cursor:pointer">${ic('palette')}<input type="color" id="eColor" style="position:absolute;opacity:0;width:0;height:0"></label>
        <div class="sep"></div>
        <button class="ibtn" data-e="insertUnorderedList" title="Liste à puces">${ic('ul')}</button><button class="ibtn" data-e="insertOrderedList" title="Liste numérotée">${ic('ol')}</button><button class="ibtn" data-e="quote" title="Citation">${ic('quote')}</button>
        <button class="ibtn" data-e="link" title="Insérer un lien (Ctrl K)">${ic('link')}</button><button class="ibtn" data-e="image" title="Insérer une image">${ic('image')}</button>
        <button class="ibtn" data-e="removeFormat" title="Effacer la mise en forme">${ic('eraser')}</button>
        <div class="sep"></div><button class="ibtn" data-e="sig" title="Insérer la signature">${ic('sig')}</button>
      </div>
       <div id="ed" contenteditable="true" spellcheck="${SET.spell !== 'off'}" lang="${spellLang()}" data-ph="Écris ton message…" style="font-family:${FONTS[SET.font] || FONTS.Inter};font-size:${SET.fsize}px"></div>
      <div class="catts" id="cAtts"></div>
    </div>
    <div class="cfoot"><button class="ibtn del" id="cDel" title="Supprimer le brouillon">${ic('trash')}</button>
      <span class="st" id="cSt"></span>
      <button class="btn primary send" id="cSend" title="Envoyer (Ctrl Entrée)">${ic('send')}Envoyer</button></div>`;
  document.body.appendChild(el);
  const ed = $('#ed');
  ed.innerHTML = o.html != null ? o.html : `<p><br></p>${sigHTML(acc)}`;
  ['to', 'cc', 'bcc'].forEach(f => renderToks(f));
  renderAtts();
  // champs
  const from = $('#cFrom'); if (from) from.onchange = () => {
    const old = ed.querySelector('[data-sig]'); CMP.acc = from.value; const s = sigHTML(CMP.acc);
    if (old) old.outerHTML = s || ''; else if (s && !CMP.inReplyTo) ed.insertAdjacentHTML('beforeend', s);
    dirty();
  };
  $('#cSubj').oninput = () => dirty();
  ed.addEventListener('input', dirty);
  el.querySelector('[data-cc]') && (el.querySelector('[data-cc]').onclick = e => { el.querySelectorAll('[data-ccrow]').forEach(r => r.classList.remove('hidden')); e.target.remove(); el.querySelector('[data-f=cc] input').focus(); });
  el.querySelectorAll('.toks').forEach(t => wireToks(t));
  el.querySelector('[data-c=min]').onclick = () => el.classList.toggle('min');
  el.querySelector('[data-c=max]').onclick = () => { el.classList.toggle('max'); el.classList.remove('min'); };
  el.querySelector('[data-c=close]').onclick = () => closeComposer(CMP.dirty ? 'save' : 'discard');
  el.querySelector('.chead').ondblclick = e => { if (!e.target.closest('button')) el.classList.toggle('min'); };
  composerDrag(el);
  $('#cDel').onclick = async () => { if (!CMP.dirty || await confirmBox('Supprimer ce brouillon ?', 'Le message en cours sera perdu.', 'Supprimer', true)) closeComposer('discard'); };
  $('#cAttach').onclick = async () => { try { const fs = await N.pickFiles(); fs.forEach(f => CMP.atts.push({ name: f.name, size: f.size, data: f.data })); renderAtts(); dirty(); } catch (e) { errToast(e); } };
  $('#cSend').onclick = () => sendNow();
  // barre d’outils
  el.querySelectorAll('[data-e]').forEach(b => b.onmousedown = e => e.preventDefault());
  el.querySelectorAll('[data-e]').forEach(b => b.onclick = () => edCmd(b.dataset.e));
  $('#eFont').onchange = () => { ed.focus(); document.execCommand('fontName', false, FONTS[$('#eFont').value]); };
  $('#eSize').onchange = () => { ed.focus(); document.execCommand('fontSize', false, $('#eSize').value); };
  $('#eColor').oninput = e => { ed.focus(); document.execCommand('foreColor', false, e.target.value); };
  // coller : images en ligne, texte HTML nettoyé
  ed.addEventListener('paste', e => {
    const cd = e.clipboardData; if (!cd) return;
    const img = [...cd.items].find(x => x.type.startsWith('image/'));
    if (img){ e.preventDefault(); const f = img.getAsFile(); const r = new FileReader(); r.onload = () => document.execCommand('insertHTML', false, `<img src="${r.result}" style="max-width:100%">`); r.readAsDataURL(f); return; }
    const h = cd.getData('text/html');
    if (h){ e.preventDefault(); document.execCommand('insertHTML', false, cleanForEditor(h, true)); }
  });
  // glisser-déposer de fichiers
  el.addEventListener('dragover', e => { if ([...e.dataTransfer.types].includes('Files')){ e.preventDefault(); el.classList.add('dragover'); } });
  el.addEventListener('dragleave', e => { if (!el.contains(e.relatedTarget)) el.classList.remove('dragover'); });
  el.addEventListener('drop', e => {
    el.classList.remove('dragover'); if (!e.dataTransfer.files.length) return; e.preventDefault();
    for (const f of e.dataTransfer.files){
      if (f.size > 35 * 1048576){ toast(`« ${f.name} » dépasse 35 Mo`); continue; }
      f.arrayBuffer().then(b => { CMP.atts.push({ name: f.name, size: f.size, data: new Uint8Array(b), type: f.type }); renderAtts(); dirty(); });
    }
  });
  el.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter'){ e.preventDefault(); sendNow(); }
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k' && e.target === ed){ e.preventDefault(); edCmd('link'); }
    else if (e.key === 'Escape' && !e.defaultPrevented && !document.querySelector('.ac')){ e.preventDefault(); closeComposer(CMP.dirty ? 'save' : 'discard'); }
  });
  // focus
  if (!CMP.to.length) el.querySelector('[data-f=to] input').focus();
  else if (!$('#cSubj').value) $('#cSubj').focus();
  else { ed.focus(); const r = document.createRange(); r.setStart(ed, 0); r.collapse(true); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
}
function dirty(){
  if (!CMP) return; CMP.dirty = true; $('#cSt').textContent = '';
  clearTimeout(saveLocalT); saveLocalT = setTimeout(saveLocal, 1500);
}
function snapshot(){
  return { kind: CMP.kind, acc: CMP.acc, to: CMP.to, cc: CMP.cc, bcc: CMP.bcc, subject: $('#cSubj').value, html: $('#ed').innerHTML, inReplyTo: CMP.inReplyTo, references: CMP.references, replyRef: CMP.replyRef, draftUid: CMP.draftUid, draftBox: CMP.draftBox,
    atts: CMP.atts.filter(a => a.key || (a.data && a.size < 4 * 1048576)).map(a => a.key ? { name: a.name, size: a.size, key: a.key } : { name: a.name, size: a.size, type: a.type, b64: btoa(Array.from(a.data, c => String.fromCharCode(c)).join('')) }) };
}
function saveLocal(){ if (!CMP || !$('#composer')) return; try { store.set('hamama-compose', JSON.stringify(snapshot())); $('#cSt').textContent = 'Enregistré sur cet ordinateur'; } catch {} }
function renderToks(f){
  const box = document.querySelector(`#composer .toks[data-f=${f}]`); if (!box) return;
  box.querySelectorAll('.tok').forEach(t => t.remove());
  const inp = box.querySelector('input');
  CMP[f].forEach((a, j) => {
    const t = document.createElement('span'); t.className = 'tok' + (validAddr(a) ? '' : ' bad'); t.title = a.address;
    t.innerHTML = `<span data-notr>${esc(a.name || a.address)}</span><button tabindex="-1">${ic('x')}</button>`;
    t.querySelector('button').onclick = () => { CMP[f].splice(j, 1); renderToks(f); dirty(); };
    t.ondblclick = () => { CMP[f].splice(j, 1); renderToks(f); inp.value = fmtAddr(a); inp.focus(); };
    box.insertBefore(t, inp);
  });
}
let acEl = null, acIdx = 0;
const closeAc = () => { if (acEl){ acEl.remove(); acEl = null; } };
function wireToks(box){
  const f = box.dataset.f, inp = box.querySelector('input');
  box.onclick = e => { if (e.target === box) inp.focus(); };
  const commit = () => { const v = inp.value.trim(); if (!v) return false; parseAddrs(v).forEach(a => { CMP[f].push(a); learn(a, 0); }); inp.value = ''; renderToks(f); dirty(); closeAc(); return true; };
  inp.addEventListener('keydown', e => {
    if (acEl && (e.key === 'ArrowDown' || e.key === 'ArrowUp')){ e.preventDefault(); const bs = acEl.querySelectorAll('button'); acIdx = (acIdx + (e.key === 'ArrowDown' ? 1 : -1) + bs.length) % bs.length; bs.forEach((b, j) => b.classList.toggle('on', j === acIdx)); return; }
    if (acEl && (e.key === 'Enter' || e.key === 'Tab') && inp.value.trim()){ e.preventDefault(); acEl.querySelectorAll('button')[acIdx].click(); return; }
    if (e.key === 'Escape' && acEl){ e.preventDefault(); e.stopPropagation(); closeAc(); return; }
    if ((e.key === 'Enter' || e.key === ',' || e.key === ';' || (e.key === 'Tab' && inp.value.trim())) && inp.value.trim()){ e.preventDefault(); commit(); }
    if (e.key === 'Backspace' && !inp.value && CMP[f].length){ CMP[f].pop(); renderToks(f); dirty(); }
  });
  inp.addEventListener('blur', () => setTimeout(() => { if (document.activeElement !== inp){ commit(); closeAc(); } }, 150));
  inp.addEventListener('paste', () => setTimeout(() => { if (/[,;]/.test(inp.value)) commit(); }, 0));
  inp.addEventListener('input', () => {
    const q = inp.value.trim().toLowerCase(); closeAc(); if (q.length < 1) return;
    const used = new Set([...CMP.to, ...CMP.cc, ...CMP.bcc].map(a => a.address.toLowerCase()));
    const res = [...CONTACTS].filter(([k, c]) => !used.has(k) && (k.includes(q) || (c[0] || '').toLowerCase().includes(q))).sort((a, b) => b[1][1] - a[1][1]).slice(0, 6);
    if (!res.length) return;
    acEl = document.createElement('div'); acEl.className = 'ac'; acEl.dataset.notr = '1'; acIdx = 0;
    acEl.innerHTML = res.map(([k, c], j) => `<button class="${j ? '' : 'on'}" data-a="${esc(k)}" data-n="${esc(c[0] || '')}">${avatar({ name: c[0], address: k })}<div><b>${esc(c[0] || k)}</b>${c[0] ? `<small>${esc(k)}</small>` : ''}</div></button>`).join('');
    acEl.querySelectorAll('button').forEach(b => b.onmousedown = e => { e.preventDefault(); CMP[f].push({ name: b.dataset.n, address: b.dataset.a }); inp.value = ''; renderToks(f); dirty(); closeAc(); inp.focus(); });
    const r = inp.getBoundingClientRect(), z = +document.body.style.zoom || 1;
    document.body.appendChild(acEl); acEl.style.left = (r.left) + 'px'; acEl.style.top = (r.bottom + 4) + 'px';
  });
}
function renderAtts(){
  const el = $('#cAtts'); if (!el) return;
  el.innerHTML = CMP.atts.map((a, j) => `<span class="catt" data-notr title="${esc(a.name)}">${ic('clip')}<span>${esc(a.name)}</span><small>${fmtSize(a.size || 0)}</small><button data-j="${j}" title="Retirer">${ic('x')}</button></span>`).join('');
  el.querySelectorAll('[data-j]').forEach(b => b.onclick = () => { CMP.atts.splice(+b.dataset.j, 1); renderAtts(); dirty(); });
  const tot = CMP.atts.reduce((s, a) => s + (a.size || 0), 0);
  if (tot > 25 * 1048576) toast('Pièces jointes > 25 Mo : certains serveurs refuseront le message');
}
async function edCmd(c){
  const ed = $('#ed'); ed.focus();
  if (c === 'quote') return document.execCommand('formatBlock', false, 'blockquote');
  if (c === 'sig'){ const s = sigHTML(CMP.acc); if (!s) return toast('Aucune signature : ajoute-la dans Réglages → Comptes'); if (!ed.querySelector('[data-sig]')) document.execCommand('insertHTML', false, s); return; }
  if (c === 'image'){ try { const fs = await N.pickFiles(); for (const f of fs){ if (!/\.(png|jpe?g|gif|webp|bmp)$/i.test(f.name)) continue; const b64 = btoa(Array.from(f.data, x => String.fromCharCode(x)).join('')); ed.focus(); document.execCommand('insertHTML', false, `<img src="data:image/${f.name.split('.').pop().replace('jpg', 'jpeg').toLowerCase()};base64,${b64}" style="max-width:100%">`); } dirty(); } catch (e) { errToast(e); } return; }
  if (c === 'link'){
    const sel = getSelection(), range = sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null, txt = sel.toString();
    const url = await promptBox('Insérer un lien', 'Adresse du lien (https://…)', /^https?:/.test(txt) ? txt : 'https://', 'Insérer');
    if (!url || !/^(https?:|mailto:)/i.test(url)) return;
    ed.focus(); if (range){ sel.removeAllRanges(); sel.addRange(range); }
    if (txt) document.execCommand('createLink', false, url); else document.execCommand('insertHTML', false, `<a href="${esc(url)}">${esc(url)}</a>`);
    dirty(); return;
  }
  document.execCommand(c, false, null); dirty();
}
/** Prépare le message : images collées → pièces jointes « cid », texte brut */
function buildMessage(){
  const ed = $('#ed').cloneNode(true), inline = [];
  ed.querySelectorAll('img[src^="data:"]').forEach((im, j) => {
    const m = im.src.match(/^data:([^;]+);base64,(.*)$/); if (!m) return;
    const cid = `img${j}.${Date.now()}@hamama`, bin = atob(m[2]), u = new Uint8Array(bin.length);
    for (let k = 0; k < bin.length; k++) u[k] = bin.charCodeAt(k);
    inline.push({ name: `image${j + 1}.${m[1].split('/')[1] || 'png'}`, type: m[1], data: u, cid }); im.src = 'cid:' + cid;
  });
  ed.querySelectorAll('[data-sig]').forEach(s => s.removeAttribute('data-sig'));
  const font = FONTS[SET.font] || FONTS.Inter;
  const html = `<div style="font-family:${font.replace(/"/g, "'")};font-size:${SET.fsize}px">${ed.innerHTML}</div>`;
  const text = $('#ed').innerText.replace(/\n{3,}/g, '\n\n');
  return {
    to: CMP.to.filter(validAddr), cc: CMP.cc.filter(validAddr), bcc: CMP.bcc.filter(validAddr), subject: $('#cSubj').value.trim(), html, text, inline,
    attachments: CMP.atts.map(a => a.key ? { key: a.key } : { name: a.name, data: a.data, type: a.type }),
    inReplyTo: CMP.inReplyTo, references: CMP.references, replyTo: CMP.replyRef, draftUid: CMP.draftUid, draftBox: CMP.draftBox
  };
}
async function sendNow(){
  if (!CMP) return;
  ['to','cc','bcc'].forEach(f => { const i = document.querySelector(`#composer .toks[data-f=${f}] input`); if (i && i.value.trim()){ parseAddrs(i.value).forEach(a => CMP[f].push(a)); i.value = ''; renderToks(f); } });
  const bad = [...CMP.to, ...CMP.cc, ...CMP.bcc].filter(a => !validAddr(a));
  if (bad.length) return toast(`Adresse invalide : ${bad[0].address}`);
  if (!CMP.to.length && !CMP.cc.length && !CMP.bcc.length){ toast('Ajoute au moins un destinataire'); document.querySelector('#composer [data-f=to] input').focus(); return; }
  if (!$('#cSubj').value.trim() && SET.noSubjWarn === 'on' && !await confirmBox('Envoyer sans objet ?', 'Ton message n’a pas d’objet.', 'Envoyer quand même')) return;
  const txt = ($('#ed').innerText || '') + ' ' + $('#cSubj').value;
  if (/pi[èe]ce[s]? jointe|ci-joint|en pj\b|attached|attachment/i.test(txt.replace(/a écrit :[\s\S]*/i, '')) && !CMP.atts.length && !await confirmBox('Pièce jointe oubliée ?', 'Ton message parle d’une pièce jointe, mais aucune n’est jointe.', 'Envoyer quand même')) return;
  const acc = CMP.acc, msg = buildMessage(), snap = snapshot();
  [...msg.to, ...msg.cc, ...msg.bcc].forEach(a => learn(a, 3));
  closeComposer('sent');
  const delay = (+SET.undoSend || 0) * 1000;
  let cancelled = false;
  const go = async () => {
    if (cancelled) return;
    const t = toast('Envoi en cours…', null, 60000);
    try {
      await N.mail.send(acc, msg); t.close(); toast('Message envoyé');
      if (msg.replyTo && ST.items){ const it = ST.items.find(i => i.acc === acc && i.box === msg.replyTo.box && i.uid === msg.replyTo.uid); if (it){ it.answered = true; updateItemEl(it); } }
      refreshFoldersSoon(acc, 1200);
      const v = ST.view; if (v && !v.uni && (folderOf(v.acc, v.box) || {}).role === 'sent') setTimeout(refreshList, 1500);
    } catch (e) {
      t.close(); toast('Échec de l’envoi : ' + cleanErr(e), { label: 'Rouvrir', fn: () => openComposer({ ...snap, atts: restoreAtts(snap.atts) }) }, 10000);
    }
  };
  if (delay){
    // décompte en temps réel ; l'envoi part exactement à 0
    const end = Date.now() + delay;
    const t = toast(T(`Envoi dans ${Math.ceil(delay / 1000)} s`), { label: 'Annuler', fn: () => { cancelled = true; clearInterval(tick); clearTimeout(timer); openComposer({ ...snap, atts: restoreAtts(snap.atts) }); toast('Envoi annulé'); } }, delay, true);
    t.el.classList.add('count'); t.el.style.setProperty('--dur', delay + 'ms');
    const sp = t.el.querySelector('span'); sp.setAttribute('data-notr', '');
    const tick = setInterval(() => { const r = Math.max(1, Math.ceil((end - Date.now()) / 1000)); sp.textContent = T(`Envoi dans ${r} s`); }, 200);
    const timer = setTimeout(() => { clearInterval(tick); t.close(); go(); }, delay);
  } else go();
}
const restoreAtts = l => (l || []).map(a => a.b64 ? { name: a.name, size: a.size, type: a.type, data: Uint8Array.from(atob(a.b64), c => c.charCodeAt(0)) } : a);
async function closeComposer(mode, silent){
  const el = $('#composer'); if (!el || !CMP) return;
  clearTimeout(saveLocalT); closeAc();
  if (mode === 'save' && CMP.dirty){
    const acc = CMP.acc, msg = buildMessage();
    try { await N.mail.draft(acc, msg); if (!silent) toast('Brouillon enregistré'); refreshFoldersSoon(acc, 800); }
    catch (e) { saveLocal(); toast('Brouillon gardé sur cet ordinateur (' + cleanErr(e) + ')'); el.remove(); CMP = null; return; }
  }
  if (mode === 'discard' && CMP.draftUid && CMP.draftBox){ const a = CMP.acc; N.mail.destroy(a, CMP.draftBox, [CMP.draftUid]).then(() => refreshFoldersSoon(a, 300)).catch(() => {}); }
  store.del('hamama-compose');
  el.remove(); CMP = null;
}

/* ================= Comptes ================= */
const PROV_UI = [
  ['gmail','Gmail','G','#ea4335'], ['outlook','Outlook','O','#0a64d8'], ['icloud','iCloud','i','#3e8ef7'], ['yahoo','Yahoo','Y','#6001d2'],
  ['orange','Orange','O','#ff7900'], ['free','Free','F','#cd1e25'], ['sfr','SFR','S','#e2001a'], ['laposte','La Poste','L','#f4c400'],
  ['gmx','GMX','G','#1c449b'], ['ovh','OVH','O','#000e9c'], ['autre','Autre…','@','#7c8592']
];
const provTiles = () => PROV_UI.map(([k, n, l, c]) => `<button class="prov" data-p="${k}"><span class="pl" style="background:${c}">${l}</span>${n}</button>`).join('');
const HELP = {
  gmail: 'Gmail exige un mot de passe d’application (16 lettres) : active la validation en deux étapes, puis crée-le ici :',
  icloud: 'iCloud exige un mot de passe pour app : compte Apple → Connexion et sécurité → Mots de passe pour app.',
  yahoo: 'Yahoo exige un mot de passe d’application : Sécurité du compte → Générer un mot de passe d’application.',
  outlook: 'Microsoft impose la connexion sécurisée « OAuth » pour Outlook / Hotmail.',
  orange: 'Utilise le mot de passe de ta messagerie Orange.', free: 'Utilise le mot de passe de ta boîte Free (zimbra).',
  sfr: 'Utilise le mot de passe de ta messagerie SFR.', laposte: 'Utilise le mot de passe de ta boîte La Poste.', gmx: 'Active d’abord l’accès IMAP dans les réglages GMX.', ovh: 'Utilise le mot de passe de ton adresse OVH.'
};
function openAddAccount(pre){
  const close = modal(`<h2>${ic('plus')} Ajouter un compte</h2><div class="sub">Choisis ton fournisseur de messagerie.</div><div class="provs">${provTiles()}</div>
    <div class="row"><button class="btn ghost" data-x>Annuler</button></div>`,
  (c, close) => { c.querySelector('[data-x]').onclick = () => close(); c.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { close(); accountForm(b.dataset.p); }); });
  if (pre){ close(); accountForm(pre); }
}
function accountForm(prov){
  const P = ST.providers[prov] || null, label = (PROV_UI.find(p => p[0] === prov) || [])[1] || 'Autre';
  const oauthOk = P && P.oauth && ST.oauth[P.oauth];
  modal(`<h2>${prov === 'autre' ? 'Autre messagerie' : esc(label)}</h2>
    <div class="sub">${HELP[prov] || 'Saisis ton adresse : Hamama trouve tout seul les réglages des serveurs.'}${P && P.appPassword ? ` <a class="lnk" data-open="${esc(P.appPassword)}">Ouvrir la page ↗</a>` : ''}</div>
    ${oauthOk ? `<button class="btn primary paybtn" data-oauth style="margin:0 0 6px">${ic('key')} Se connecter avec ${prov === 'outlook' ? 'Microsoft' : 'Google'}</button><div class="note" style="text-align:center;margin-bottom:6px">ou avec un mot de passe d’application :</div>` : ''}
    ${prov === 'outlook' && !oauthOk ? `<div class="err-box" style="margin:0 0 6px">La connexion Microsoft n’est pas encore activée dans cette version de Hamama. Les comptes Outlook.com / Hotmail ne peuvent pas encore être ajoutés (les comptes Microsoft 365 d’entreprise avec IMAP autorisé peuvent fonctionner).</div>` : ''}
    <label class="lbl">Ton nom (affiché aux destinataires)</label><input class="field" data-k="name" placeholder="Félix" autofocus>
    <label class="lbl">Adresse e-mail</label><input class="field" data-k="email" type="email" placeholder="prenom@exemple.fr" spellcheck="false">
    <label class="lbl">${P && P.appPassword ? 'Mot de passe d’application' : 'Mot de passe'}</label><input class="field" data-k="pass" type="password">
    <details class="adv"${prov === 'autre' ? '' : ''}><summary>Réglages avancés (serveurs)</summary>
      <label class="lbl">Identifiant (si différent de l’adresse)</label><input class="field" data-k="user" spellcheck="false">
      <div class="g2"><div><label class="lbl">Serveur de réception IMAP</label><input class="field" data-k="ih"></div><div><label class="lbl">Port</label><input class="field" data-k="ip" type="number"></div><div><label class="lbl">Sécurité</label><select class="field" data-k="is"><option value="1">SSL/TLS</option><option value="0">STARTTLS</option></select></div></div>
      <div class="g2"><div><label class="lbl">Serveur d’envoi SMTP</label><input class="field" data-k="sh"></div><div><label class="lbl">Port</label><input class="field" data-k="sp" type="number"></div><div><label class="lbl">Sécurité</label><select class="field" data-k="ss"><option value="1">SSL/TLS</option><option value="0">STARTTLS</option></select></div></div>
      <label class="chk"><input type="checkbox" data-k="insecure"> Accepter un certificat non vérifié (serveur local uniquement)</label>
      <div class="note" data-src></div>
    </details>
    <div data-msg></div>
    <div class="row"><button class="btn ghost" data-back>${ic('left')}Retour</button><span class="spacer"></span><button class="btn primary" data-ok>${ic('check')}Se connecter</button></div>`,
  (c, close) => {
    const F = k => c.querySelector(`[data-k=${k}]`), msg = c.querySelector('[data-msg]');
    let touched = false;
    ['ih','ip','is','sh','sp','ss'].forEach(k => F(k).addEventListener('input', () => touched = true));
    const fill = (cfg, auto) => { if (!cfg || (auto && touched)) return; F('ih').value = cfg.imap.host; F('ip').value = cfg.imap.port; F('is').value = cfg.imap.secure ? '1' : '0'; F('sh').value = cfg.smtp.host; F('sp').value = cfg.smtp.port; F('ss').value = cfg.smtp.secure ? '1' : '0'; if (cfg.userName && !F('user').value) F('user').value = cfg.userName; };
    fill(P);
    let detected = P ? { ...P, provider: prov } : null;
    const det = async () => {
      const em = F('email').value.trim(); if (!/@.+\./.test(em) || P) return;
      c.querySelector('[data-src]').textContent = 'Recherche des réglages…';
      try { const d = await N.acc.detect(em); if (F('email').value.trim() !== em) return; if (touched){ c.querySelector('[data-src]').textContent = ''; return; } detected = d; fill(detected, true); c.querySelector('[data-src]').textContent = { connu:'Fournisseur reconnu', Mozilla:'Réglages trouvés (base Mozilla)', MX:'Réglages trouvés via le domaine', devinette:'Réglages supposés : vérifie-les si la connexion échoue' }[detected.source] || ''; if (detected.source === 'devinette') c.querySelector('details').open = true; }
      catch { c.querySelector('[data-src]').textContent = ''; }
    };
    F('email').addEventListener('blur', det);
    c.querySelectorAll('[data-open]').forEach(a => a.onclick = () => window.open(a.dataset.open));
    c.querySelector('[data-back]').onclick = () => { close(); openAddAccount(); };
    const cfgOf = () => ({
      name: F('name').value.trim(), email: F('email').value.trim(), pass: F('pass').value, user: F('user').value.trim() || F('email').value.trim(),
      imap: { host: F('ih').value.trim(), port: +F('ip').value || 993, secure: F('is').value === '1' },
      smtp: { host: F('sh').value.trim(), port: +F('sp').value || 465, secure: F('ss').value === '1' },
      provider: (detected && detected.provider) || prov, saveSent: !(detected && detected.saveSent === false), insecure: F('insecure').checked,
      color: ['#4a84c4','#3d9579','#bf5a82','#c0962e','#8a6cc4','#c8703f','#3a98a8','#c2524a'][ST.accounts.length % 8]
    });
    const finish = async cfg => {
      const a = await N.acc.add(cfg);
      close(); toast('Compte ajouté : ' + a.email);
      await reloadAccounts(); openView({ acc: a.id, box: 'INBOX' });
    };
    const ob = c.querySelector('[data-oauth]');
    if (ob) ob.onclick = async () => {
      msg.innerHTML = '<div class="note">Une page de connexion s’ouvre dans ton navigateur…</div>';
      try {
        const r = await N.acc.oauth(P.oauth, F('email').value.trim());
        const cfg = { ...cfgOf(), email: r.email || F('email').value.trim(), user: r.email || F('email').value.trim(), pass: '', oauth: { provider: r.provider, refresh: r.refresh, pendingAccess: r.access, pendingExp: r.exp } };
        msg.innerHTML = '<div class="note">Vérification…</div>';
        const t = await N.acc.test(cfg); if (!t.ok) throw new Error(t.err);
        await finish(cfg);
      } catch (e) { msg.innerHTML = `<div class="err-box">${esc(cleanErr(e))}</div>`; }
    };
    const ok = c.querySelector('[data-ok]');
    const go = async () => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(F('email').value.trim())) return msg.innerHTML = '<div class="err-box">Adresse e-mail invalide.</div>';
      if (!F('pass').value) return msg.innerHTML = '<div class="err-box">Saisis le mot de passe.</div>';
      if (!F('ih').value) await det();
      if (ST.accounts.some(a => a.email.toLowerCase() === F('email').value.trim().toLowerCase())) return msg.innerHTML = '<div class="err-box">Ce compte est déjà dans Hamama.</div>';
      ok.disabled = true; ok.innerHTML = `${ic('refresh')}Connexion…`; msg.innerHTML = '';
      try {
        const cfg = cfgOf();
        const t = await N.acc.test(cfg);
        if (!t.ok){ msg.innerHTML = `<div class="err-box"><b>${t.step === 'imap' ? 'Réception (IMAP)' : 'Envoi (SMTP)'} :</b> ${esc(t.err)}</div>`; if (!/mot de passe/.test(t.err)) c.querySelector('details').open = true; return; }
        await finish(cfg);
      } catch (e) { msg.innerHTML = `<div class="err-box">${esc(cleanErr(e))}</div>`; }
      finally { ok.disabled = false; ok.innerHTML = `${ic('check')}Se connecter`; }
    };
    ok.onclick = go;
    c.querySelectorAll('input').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') go(); }));
  }, { sticky: true });
}
function openAccount(id){
  const a = accOf(id); if (!a) return;
  modal(`<h2><span class="dot" style="width:12px;height:12px;border-radius:50%;background:${accColor(a)};display:inline-block"></span> <span data-notr>${esc(a.email)}</span></h2><div class="sub">Réglages de ce compte</div>
    <label class="lbl">Nom affiché aux destinataires</label><input class="field" data-k="name" value="${esc(a.name)}">
    <label class="lbl">Nom du compte dans Hamama</label><input class="field" data-k="label" value="${esc(a.label)}" placeholder="${esc(a.email)}">
    <label class="lbl">Couleur</label><div class="swrow" data-col>${AVC.map(c => `<button class="sw${c === accColor(a) ? ' on' : ''}" data-c="${c}" style="background:${c}"></button>`).join('')}</div>
    <label class="lbl">Signature</label><div class="field sigEd" contenteditable="true" data-sig>${a.signature ? cleanForEditor(a.signature, true) : ''}</div>
    <label class="chk"><input type="checkbox" data-k="saveSent"${a.saveSent ? ' checked' : ''}> Copier les messages envoyés dans « Envoyés » (à décocher pour Gmail / Outlook)</label>
    ${a.oauth ? '' : `<details class="adv"><summary>Mot de passe et serveurs</summary>
      <label class="lbl">Nouveau mot de passe</label><input class="field" data-k="pass" type="password" placeholder="Laisser vide pour ne pas changer">
      <div class="g2"><div><label class="lbl">IMAP</label><input class="field" data-k="ih" value="${esc(a.imap.host)}"></div><div><label class="lbl">Port</label><input class="field" data-k="ip" type="number" value="${a.imap.port}"></div><div><label class="lbl">Sécurité</label><select class="field" data-k="is"><option value="1"${a.imap.secure ? ' selected' : ''}>SSL/TLS</option><option value="0"${a.imap.secure ? '' : ' selected'}>STARTTLS</option></select></div></div>
      <div class="g2"><div><label class="lbl">SMTP</label><input class="field" data-k="sh" value="${esc(a.smtp.host)}"></div><div><label class="lbl">Port</label><input class="field" data-k="sp" type="number" value="${a.smtp.port}"></div><div><label class="lbl">Sécurité</label><select class="field" data-k="ss"><option value="1"${a.smtp.secure ? ' selected' : ''}>SSL/TLS</option><option value="0"${a.smtp.secure ? '' : ' selected'}>STARTTLS</option></select></div></div>
    </details>`}
    <div data-msg></div>
    <div class="row"><button class="btn ghost" data-del style="color:#f87171">${ic('trash')}Retirer le compte</button><span class="spacer"></span><button class="btn ghost" data-x>Annuler</button><button class="btn primary" data-ok>${ic('check')}Enregistrer</button></div>`,
  (c, close) => {
    const F = k => c.querySelector(`[data-k=${k}]`);
    let color = accColor(a);
    c.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { color = b.dataset.c; c.querySelectorAll('[data-c]').forEach(x => x.classList.toggle('on', x === b)); });
    c.querySelector('[data-x]').onclick = () => close();
    c.querySelector('[data-del]').onclick = async () => {
      if (!await confirmBox('Retirer ce compte de Hamama ?', `${a.email} sera retiré de Hamama. Tes messages restent sur le serveur.`, 'Retirer', true)) return;
      await N.acc.remove(id); close(); toast('Compte retiré'); await reloadAccounts(); openDefault();
    };
    c.querySelector('[data-ok]').onclick = async () => {
      const patch = { name: F('name').value.trim(), label: F('label').value.trim(), color, signature: cleanForEditor(c.querySelector('[data-sig]').innerHTML, true).replace(/^(<br>)+$/, ''), saveSent: F('saveSent').checked };
      if (F('pass')){
        if (F('pass').value) patch.pass = F('pass').value;
        const imap = { host: F('ih').value.trim(), port: +F('ip').value, secure: F('is').value === '1' }, smtp = { host: F('sh').value.trim(), port: +F('sp').value, secure: F('ss').value === '1' };
        if (JSON.stringify(imap) !== JSON.stringify(a.imap)) patch.imap = imap;
        if (JSON.stringify(smtp) !== JSON.stringify(a.smtp)) patch.smtp = smtp;
      }
      try { await N.acc.update(id, patch); close(); toast('Compte enregistré'); await reloadAccounts(); if (patch.pass || patch.imap) loadFolders(id); }
      catch (e) { c.querySelector('[data-msg]').innerHTML = `<div class="err-box">${esc(cleanErr(e))}</div>`; }
    };
  });
}
async function reloadAccounts(){
  const r = await N.acc.list(); ST.accounts = r.accounts; ST.providers = r.providers; ST.oauth = r.oauth;
  for (const id of Object.keys(ST.folders)) if (!accOf(id)) delete ST.folders[id];
  const has = ST.accounts.length > 0;
  $('#welcome').classList.toggle('hidden', has); $('#app').classList.toggle('hidden', !has); document.documentElement.classList.toggle('noacc', !has);
  if (!has){ $('#welcomeProvs').innerHTML = provTiles(); $('#welcomeProvs').querySelectorAll('[data-p]').forEach(b => b.onclick = () => accountForm(b.dataset.p)); }
  for (const a of ST.accounts) if (!ST.folders[a.id]){ try { const c = await N.mail.cached(a.id); if (c.folders) ST.folders[a.id] = c.folders; } catch {} }
  renderSide(); loadAllFolders();
}

/* ================= Réglages ================= */
const THEMES = [['graphite','Graphite'],['sombre','Sombre'],['noir','Noir OLED'],['clair','Clair']];
const THEME_PREV = { graphite:['#262624','#2e2e2b','#3a3a37'], sombre:['#0c0c0f','#141418','#1b1b21'], noir:['#000','#0a0a0a','#151515'], clair:['#f4f3ee','#eeede7','#e1dfd7'] };
async function openSettings(tab = 'look'){
  let prefs = { notify: true, sound: true, tray: false, startup: false };
  try { prefs = await N.prefs(); } catch {}
  const LN = new Set(['Français','English','Español','Deutsch','Italiano','Português','العربية']);
  const seg = (key, opts) => `<div class="seg" data-key="${key}">${opts.map(([v, l]) => `<button data-v="${v}" class="${String(SET[key]) === v ? 'on' : ''}"${LN.has(l) ? ' data-notr' : ''}>${l}</button>`).join('')}</div>`;
  const pseg = (key, opts) => `<div class="seg" data-pkey="${key}">${opts.map(([v, l]) => `<button data-v="${v}" class="${String(!!prefs[key]) === v ? 'on' : ''}">${l}</button>`).join('')}</div>`;
  const R = (lbl, inner, note) => `<div class="setrow"><span class="lbl">${lbl}</span>${inner}${note ? `<div class="note">${note}</div>` : ''}</div>`;
  const yn = [['on','Oui'],['off','Non']], pyn = [['true','Oui'],['false','Non']];
  const TABS = {
    look: ['Apparence', () =>
      R('Thème', `<div class="themes">${THEMES.map(([v, l]) => { const [bg, pn, p2] = THEME_PREV[v]; return `<button data-th="${v}" class="${SET.theme === v ? 'on' : ''}"><div class="mini" style="background:${bg}"><div style="width:24%;background:${pn}"></div><div style="width:34%;display:flex;flex-direction:column;gap:3px;padding:4px"><div style="height:6px;background:${p2};border-radius:2px"></div><div style="height:6px;background:${p2};border-radius:2px"></div><div style="height:6px;background:${p2};border-radius:2px"></div></div><div style="flex:1;display:flex;align-items:center;justify-content:center"><div style="width:70%;height:76%;background:#fff;border-radius:2px"></div></div></div><span>${l}</span></button>`; }).join('')}</div>`) +
      R('Police de l’interface', `<div class="fonts">${UI_FONTS.map(f => `<button data-font="${f}" class="${SET.uifont === f ? 'on' : ''}" style="font-family:${f === 'Inter' ? 'Inter' : `'${f}'`},sans-serif"><b>Aa</b><small>${f}</small></button>`).join('')}</div>`) +
      R('Texte en gras', seg('weight', [['normal','Gras'],['leger','Demi-gras'],['fin','Sans gras']]), 'S’applique aux titres, noms et boutons. Le texte que tu mets en gras dans tes messages n’est pas touché.') +
      R('Messages non lus en gras', seg('unreadBold', [['on','Oui'],['off','Non']]), 'Si « Non », les non-lus restent signalés par le point de couleur.') +
      R('Couleur d’accent', `<div class="swrow" data-acc>${ACCENTS.map(c => `<button class="sw${c === SET.accent.toLowerCase() ? ' on' : ''}" data-a="${c}" style="background:${c}"></button>`).join('')}<label class="cpick" title="Couleur personnalisée"><input type="color" value="${SET.accent}"></label></div>`) +
      R('Disposition', seg('layout', [['trois','3 colonnes'],['large','Lecture en dessous'],['focus','Focus']]), '« Focus » : la liste prend toute la place, le message s’ouvre en grand.') +
      R('Densité', seg('density', [['compact','Compacte'],['confort','Confortable']])) +
      R('Taille de l’interface', seg('zoom', [['s','Petite'],['m','Moyenne'],['l','Grande'],['xl','Très grande']])) +
      R('Coins', seg('radius', [['carre','Carrés'],['doux','Doux'],['rond','Ronds']])) +
      R('Barre des dossiers', seg('side', [['shown','Visible'],['hidden','Masquée']]))],
    list: ['Liste', () =>
      R('Aperçu du texte', seg('preview', [['0','Aucun'],['1','1 ligne'],['2','2 lignes']])) +
      R('Avatars', seg('avatars', yn)) +
      R('Grouper par date', seg('groups', yn)) +
      R('Boîte unifiée (tous les comptes)', seg('unified', yn)) +
      R('Compteurs des dossiers', seg('counts', [['unread','Non lus'],['total','Total'],['none','Aucun']])) +
      R('Actions au survol', `<div class="toggles">${[['archive','Archiver'],['trash','Supprimer'],['read','Lu / non lu'],['star','Suivre']].map(([v, l]) => `<label class="chk"><input type="checkbox" data-qa="${v}"${SET.qa.includes(v) ? ' checked' : ''}> ${l}</label>`).join('')}</div>`) +
      R('Après archivage ou suppression', seg('after', [['next','Message suivant'],['prev','Précédent'],['list','Revenir à la liste']]))],
    read: ['Lecture', () =>
      R('Marquer comme lu', seg('markRead', [['now','Tout de suite'],['delay','Après 2 s'],['never','Manuellement']])) +
      R('Images distantes', seg('images', [['ask','Bloquer (recommandé)'],['always','Toujours afficher']]), 'Les images distantes peuvent servir à savoir quand tu ouvres un mail.') +
      R('Fond des messages', seg('mailbg', [['blanc','Blanc (fidèle)'],['theme','Suivre le thème (sombre)']])) +
      R('Taille du texte des messages', seg('mailZoom', [['90','90 %'],['100','100 %'],['115','115 %'],['130','130 %']])) +
      R('Largeur de lecture', seg('readw', [['normal','Normale'],['large','Large'],['plein','Pleine']])) +
      R('Libellés des boutons', seg('labels', yn))],
    write: ['Rédaction', () =>
      R('Police par défaut', `<select class="field" data-sel="font">${Object.keys(FONTS).map(f => `<option${f === SET.font ? ' selected' : ''} style="font-family:${FONTS[f]}">${f}</option>`).join('')}</select>`) +
      R('Taille du texte', seg('fsize', [['13','13'],['14','14'],['16','16'],['18','18']])) +
      (MOBILE ? '' : R('Correcteur orthographique', `<select class="field" data-sel="spell">${[['auto','Automatique (langue de l’appli)'],['fr','Français'],['en','English'],['es','Español'],['de','Deutsch'],['it','Italiano'],['pt','Português'],['off','Désactivé']].map(([v, l]) => `<option value="${v}"${SET.spell === v ? ' selected' : ''}${['auto','off'].includes(v) ? '' : ' data-notr'}>${l}</option>`).join('')}</select>`)) +
      R('Délai pour annuler l’envoi', seg('undoSend', [['0','Aucun'],['5','5 s'],['10','10 s'],['20','20 s']])) +
      R('Fenêtre de rédaction', seg('compWin', [['float','Flottante'],['max','Grande']])) +
      R('Avertir si l’objet est vide', seg('noSubjWarn', yn))],
    accounts: ['Comptes', () =>
      `<div class="alist">${ST.accounts.map(a => `<div class="ai">${avatar({ name: a.name || a.email, address: a.email }).replace('class="av ', `style="background:${accColor(a)};color:#fff" class="av col `)}<div class="t" data-notr><b>${esc(accLabel(a))}</b><small>${esc(a.email)} · ${esc((ST.providers[a.provider] || {}).label || a.imap.host)}</small></div><button class="btn ghost" data-edit="${a.id}">${ic('edit')}Modifier</button></div>`).join('')}</div>
       <button class="btn primary" data-addacc style="margin-top:6px">${ic('plus')}Ajouter un compte</button>
       <div class="note">Les mots de passe sont chiffrés par Windows sur cet ordinateur et ne sont jamais envoyés ailleurs qu’à ton fournisseur.</div>`],
    blocked: ['Bloqués', () =>
      R('Expéditeurs bloqués', `<div style="display:flex;gap:8px"><input class="field" data-newblock placeholder="Adresse ou @domaine" spellcheck="false"><button class="btn primary" data-addblock>Ajouter</button></div><div data-blist style="margin-top:12px"></div>`, 'Les messages des expéditeurs bloqués vont directement dans Indésirables, sans notification. Pour bloquer tout un domaine, écris @domaine.fr.')],
    notif: ['Notifications', () =>
      R('Notifications des nouveaux messages', pseg('notify', pyn)) +
      (MOBILE ? '' : R('Son', pseg('sound', pyn)) +
      R('Garder Hamama dans la zone de notification à la fermeture', pseg('tray', pyn), 'Hamama continue de recevoir les messages quand la fenêtre est fermée.') +
      R('Lancer Hamama au démarrage de Windows', pseg('startup', pyn)) +
      R('Application mail par défaut', `<button class="btn ghost" data-defmail>${ic('mail')}Définir Hamama pour les liens « mailto: »</button>`, 'Windows ouvre ses Paramètres : choisis Hamama pour « MAILTO ».'))],
    lang: ['Langue', () =>
      R('Langue de l’application', `<div class="seg" data-langs style="flex-direction:column">${[['auto','Automatique (langue de Windows)'], ...LANGS].map(([v, l]) => `<button data-lang="${v}" class="${(SET.lang || 'auto') === v ? 'on' : ''}" style="text-align:left;padding:0 14px;height:38px"${v === 'auto' ? '' : ' data-notr'}>${l}</button>`).join('')}</div>`, 'Hamama redémarre son interface pour appliquer la langue.')],
    keys: ['Raccourcis', () =>
      R('Raccourcis clavier', seg('keys', [['on','Activés'],['off','Désactivés']])) + `<div class="keyl" style="margin-top:14px">${KEYS.map(([k, l]) => `<div><span>${l}</span><span>${k.split(' ').map(x => `<kbd class="k">${x}</kbd>`).join(' ')}</span></div>`).join('')}</div>`],
    about: ['À propos', () =>
      `<div style="text-align:center;padding:10px 0"><div class="drop" style="border:0;padding:10px;background:none"><div class="big">${ic('plane')}</div><h1 style="font-size:22px">Hamama</h1><p data-ver style="margin-bottom:10px">Application mail</p></div>
       <div data-upd style="text-align:left;margin:4px 0 14px"></div>
       <div class="note" style="text-align:center">Sans publicité · sans pistage · tes messages restent entre toi et ton fournisseur.</div>
       <div class="row" style="justify-content:center"><button class="btn ghost heart" data-sup>${ic('heart')}Soutenir Hamama</button></div></div>`]
  };
  if (MOBILE) delete TABS.keys;
  modal(`<h2>Personnaliser Hamama</h2><div class="sub">Les changements s’appliquent tout de suite et sont mémorisés.</div>
    <div class="setwrap"><div class="tabs v">${Object.entries(TABS).map(([k, [l]]) => `<button data-tab="${k}">${l}</button>`).join('')}</div><div data-body></div></div>
    <div class="row"><button class="btn ghost" data-reset>Réinitialiser l’apparence</button><span class="spacer"></span><button class="btn primary" data-x>${ic('check')}Terminé</button></div>`,
  (card, close) => {
    const body = card.querySelector('[data-body]');
    const show = t => {
      tab = t; card.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('on', b.dataset.tab === t));
      body.innerHTML = TABS[t][1]();
      body.querySelectorAll('[data-th]').forEach(b => b.onclick = () => { SET.theme = b.dataset.th; changed(); });
      body.querySelectorAll('[data-font]').forEach(b => b.onclick = () => { SET.uifont = b.dataset.font; changed(); });
      body.querySelectorAll('[data-lang]').forEach(b => b.onclick = async () => { if ((SET.lang || 'auto') === b.dataset.lang) return; SET.lang = b.dataset.lang; applySettings(); try { await N.prefs({ lang: SET.lang === 'auto' ? (navigator.language || 'fr').slice(0, 2) : SET.lang }); } catch {} location.reload(); });
      body.querySelectorAll('[data-a]').forEach(b => b.onclick = () => { SET.accent = b.dataset.a; changed(); });
      const cp = body.querySelector('input[type=color]'); if (cp) cp.oninput = e => { SET.accent = e.target.value; applySettings(); };
      body.querySelectorAll('.seg[data-key]').forEach(sg => sg.querySelectorAll('button').forEach(b => b.onclick = () => { SET[sg.dataset.key] = b.dataset.v; changed(); }));
      body.querySelectorAll('.seg[data-pkey]').forEach(sg => sg.querySelectorAll('button').forEach(b => b.onclick = async () => { prefs[sg.dataset.pkey] = b.dataset.v === 'true'; try { prefs = await N.prefs(prefs); } catch (e) { errToast(e); } show(tab); }));
      body.querySelectorAll('[data-qa]').forEach(i => i.onchange = () => { SET.qa = [...body.querySelectorAll('[data-qa]:checked')].map(x => x.dataset.qa); changed(); });
      body.querySelectorAll('[data-sel]').forEach(s => s.onchange = () => { SET[s.dataset.sel] = s.value; changed(); });
      body.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => openAccount(b.dataset.edit));
      const bl = body.querySelector('[data-blist]');
      if (bl){
        const paint = () => { if (!bl.isConnected){ blockPaint = null; return; } bl.innerHTML = ST.blocked.length ? `<div class="alist">${ST.blocked.map(e => `<div class="ai" style="padding:8px 8px 8px 14px">${ic('ban')}<div class="t" data-notr><b>${esc(e)}</b>${e.startsWith('@') ? `<small data-tr>Tout le domaine</small>` : ''}</div><button class="btn ghost" data-unb="${esc(e)}">Débloquer</button></div>`).join('')}</div>` : `<div class="note">Aucun expéditeur bloqué.</div>`;
          bl.querySelectorAll('[data-tr]').forEach(x => { x.removeAttribute('data-tr'); x.textContent = T('Tout le domaine'); });
          bl.querySelectorAll('[data-unb]').forEach(b => b.onclick = () => unblockSender(b.dataset.unb)); };
        blockPaint = paint; paint();
        const inp = body.querySelector('[data-newblock]');
        const add = async () => { const v = inp.value.trim(); if (!v) return; if (await blockSender(v, false)){ inp.value = ''; paint(); } };
        body.querySelector('[data-addblock]').onclick = add; inp.onkeydown = e => { if (e.key === 'Enter') add(); };
      }
      const aa = body.querySelector('[data-addacc]'); if (aa) aa.onclick = () => { close(); openAddAccount(); };
      const dm = body.querySelector('[data-defmail]'); if (dm) dm.onclick = () => N.defaultMail().catch(errToast);
      const sp = body.querySelector('[data-sup]'); if (sp) sp.onclick = () => openSupport();
      const vr = body.querySelector('[data-ver]'); if (vr) N.version().then(v => vr.textContent = 'Version ' + v).catch(() => {});
      const ub = body.querySelector('[data-upd]'); if (ub){ const paint = () => { if (!ub.isConnected){ updPaint = null; return; } ub.innerHTML = updHTML(); const b = ub.querySelector('[data-uact]'); if (b) b.onclick = () => b.dataset.uact === 'check' ? N.update.check().catch(errToast) : installUpdate(); }; updPaint = paint; paint(); }
    };
    const changed = () => { applySettings(); show(tab); renderSide(); renderList(); if (ST.msg) renderView(ST.msg); };
    card.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => show(b.dataset.tab));
    card.querySelector('[data-reset]').onclick = () => { for (const k of ['theme','accent','layout','density','zoom','radius','side','uifont','weight','unreadBold']) SET[k] = DEF_SET[k]; changed(); };
    card.querySelector('[data-x]').onclick = () => close();
    show(tab);
  }, { cls: 'set' });
}

/* ================= Soutenir Hamama ================= */
const SUPPORT_URL = '';
function openSupport(){
  modal(`<div class="sup-hero">${ic('heart')}</div><h2 style="justify-content:center">Soutenir Hamama</h2>
    <div class="sub" style="text-align:center;line-height:1.6">Hamama est gratuit, sans publicité et ne lit jamais tes messages.<br>S’il te rend service, tu peux soutenir son développement </div>
    ${SUPPORT_URL ? `<a class="btn primary paybtn" href="${SUPPORT_URL}" target="_blank" rel="noopener">${ic('wallet')} Payer avec Apple Pay ou carte</a>` : `<button class="btn ghost paybtn" disabled style="opacity:.6">Lien de paiement bientôt disponible</button>`}
    <div class="note" style="text-align:center">Paiement sécurisé · Apple Pay, Apple Card et cartes bancaires</div>
    <div class="row" style="justify-content:center"><button class="btn ghost" data-x>Fermer</button></div>`,
  (card, close) => { card.querySelector('[data-x]').onclick = () => close(); const a = card.querySelector('a.paybtn'); if (a) a.onclick = () => setTimeout(close, 300); });
}

/* ================= Recherche ================= */
let searchTok = 0, localT = null;
$('#scopeBtn').onclick = e => { e.preventDefault(); ST.scope = ST.scope === 'box' ? 'all' : 'box'; $('#scopeBtn').textContent = ST.scope === 'box' ? 'Ce dossier' : 'Partout'; if (ST.search) runSearch(ST.search); $('#q').focus(); };
$('#q').addEventListener('keydown', e => {
  if (e.key === 'Enter'){ e.preventDefault(); runSearch($('#q').value.trim()); }
  if (e.key === 'Escape'){ e.preventDefault(); clearSearch(); $('#q').blur(); }
  if (e.key === 'ArrowDown'){ e.preventDefault(); $('#list').focus(); const f = visible()[0]; f && openMsg(f.key); }
});
$('#q').addEventListener('input', () => {
  clearTimeout(localT);
  const q = $('#q').value.trim();
  if (!q){ if (ST.search) clearSearch(); return; }
  localT = setTimeout(() => runSearch(q), 450);
});
async function runSearch(q){
  if (!q) return clearSearch();
  if (!ST.search) ST.prevItems = { items: ST.items, more: ST.more };
  ST.search = q; ST.sel.clear(); const tok = ++searchTok; setBusy(true);
  // résultat local instantané, puis recherche sur le serveur
  const ql = q.toLowerCase();
  ST.items = (ST.prevItems ? ST.prevItems.items : []).filter(i => (i.subject + ' ' + i.preview + ' ' + (i.from || []).map(fmtAddr).join(' ')).toLowerCase().includes(ql));
  renderList();
  try {
    const v = ST.view;
    const r = ST.scope === 'all' || v.uni ? await N.mail.searchAll(q) : await N.mail.search(v.acc, v.box, q);
    if (tok !== searchTok || ST.search !== q) return;
    ST.items = r.items; renderList();
  } catch (e) { if (tok === searchTok) errToast(e); }
  finally { if (tok === searchTok) setBusy(false); }
}
function clearSearch(){
  if (!ST.search) return; ST.search = null; $('#q').value = ''; ++searchTok;
  if (ST.prevItems){ ST.items = ST.prevItems.items; ST.more = ST.prevItems.more; ST.prevItems = null; }
  renderList(); refreshList();
}

/* ================= Clavier ================= */
const KEYS = [['N','Nouveau message'],['R','Répondre'],['A','Répondre à tous'],['F','Transférer'],['E','Archiver'],['Suppr','Supprimer'],['J ↓','Message suivant'],['K ↑','Message précédent'],['U','Lu / non lu'],['S','Suivre'],['V','Déplacer'],['Ctrl K','Rechercher'],['Ctrl A','Tout sélectionner'],['F5','Actualiser'],['Ctrl Entrée','Envoyer'],['Échap','Fermer / retour'],['?','Cette aide']];
function moveSel(d){
  const vis = visible(); if (!vis.length) return;
  let idx = vis.findIndex(i => i.key === ST.open);
  idx = idx < 0 ? 0 : Math.max(0, Math.min(vis.length - 1, idx + d));
  ST.sel = new Set([vis[idx].key]); ST.anchor = vis[idx].key; openMsg(vis[idx].key);
}
function onKey(e){
  if (e.defaultPrevented) return;
  const k = e.key, ctrl = e.ctrlKey || e.metaKey;
  if (ctrl && k.toLowerCase() === 'k' || (!isTyping(e) && k === '/' && SET.keys === 'on')){ if ($('#composer') && $('#composer').contains(document.activeElement)) return; e.preventDefault(); $('#q').focus(); $('#q').select(); return; }
  if (k === 'F5' || (ctrl && k.toLowerCase() === 'r')){ e.preventDefault(); refreshAll(); return; }
  if (isTyping(e) || modalOpen || menuEl) return;
  if (ctrl && k.toLowerCase() === 'a'){ e.preventDefault(); ST.sel = new Set(visible().map(i => i.key)); renderList(); return; }
  if (ctrl && k.toLowerCase() === 'p' && ST.msg){ e.preventDefault(); printMsg(); return; }
  if (ctrl && k.toLowerCase() === 'n'){ e.preventDefault(); openComposer(); return; }
  if (k === 'Escape'){
    if (ST.sel.size > 1 || ST.selMode){ ST.sel.clear(); ST.selMode = false; renderList(); if (ST.open) openMsg(ST.open); else showEmptyView(); return; }
    if (ST.search){ clearSearch(); return; }
    if (document.documentElement.classList.contains('reading')){ viewAction('back'); return; }
    return;
  }
  if (SET.keys !== 'on' || ctrl || e.altKey) return;
  const keys = ST.sel.size ? [...ST.sel] : ST.open ? [ST.open] : [];
  const one = ST.open || keys[0];
  switch (k){
    case 'j': case 'ArrowDown': e.preventDefault(); moveSel(1); break;
    case 'k': case 'ArrowUp': e.preventDefault(); moveSel(-1); break;
    case 'n': case 'c': e.preventDefault(); openComposer(); break;
    case 'r': if (one){ e.preventDefault(); replyTo(one, 'reply'); } break;
    case 'a': if (one){ e.preventDefault(); replyTo(one, 'all'); } break;
    case 'f': if (one){ e.preventDefault(); replyTo(one, 'fwd'); } break;
    case 'e': case 'y': if (keys.length) act('archive', keys); break;
    case 'Delete': case '#': case 'Backspace': if (keys.length) act('trash', keys); break;
    case 's': if (keys.length){ const i = itemOf(keys[0]); act(i && i.flagged ? 'unstar' : 'star', keys); } break;
    case 'u': case 'i': if (keys.length){ const i = itemOf(keys[0]); act(i && i.seen ? 'unread' : 'read', keys); clearTimeout(readT); } break;
    case 'v': if (keys.length) pickFolder(keys, null, innerWidth / 2 - 140, 140); break;
    case 'Enter': if (one){ const i = itemOf(one); if (i && (i.draft || (folderOf(i.acc, i.box) || {}).role === 'drafts')) openDraft(i); else openMsg(one); } break;
    case '?': openSettings('keys'); break;
  }
}
document.addEventListener('keydown', onKey);
// Bouton retour Android : ferme ce qui est ouvert, sinon l'appli passe en arrière-plan
addEventListener('hamama-back', e => {
  const md = [...document.querySelectorAll('.modal')].pop();
  if (menuEl){ closeMenu(); e.preventDefault(); return; }
  if (md){ document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); e.preventDefault(); return; }
  if ($('#composer')){ closeComposer(CMP && CMP.dirty ? 'save' : 'discard'); e.preventDefault(); return; }
  if (document.documentElement.classList.contains('drawer')){ setDrawer(false); e.preventDefault(); return; }
  if (ST.search){ clearSearch(); e.preventDefault(); return; }
  if (document.documentElement.classList.contains('reading')){ viewAction('back'); e.preventDefault(); return; }
  if (ST.sel.size > 1 || ST.selMode){ ST.sel.clear(); ST.selMode = false; renderList(); e.preventDefault(); }
});

/* ================= Redimensionnement des colonnes ================= */
(() => {
  const root = document.documentElement;
  for (const [p, k, u] of [['--sidew','hamama-sidew','px'],['--listw','hamama-listw','px'],['--listh','hamama-listh','%']]){ const v = +store.get(k); if (v) root.style.setProperty(p, v + u); }
  const modes = {
    side: () => ({ prop:'--sidew', key:'hamama-sidew', min:170, max:420, vert:false, el:$('#side') }),
    list: () => SET.layout === 'large' ? { prop:'--listh', key:'hamama-listh', vert:true, el:$('#listCol') } : { prop:'--listw', key:'hamama-listw', min:280, max:760, vert:false, el:$('#listCol') }
  };
  for (const [id, mk] of [['#gripSide', modes.side], ['#gripList', modes.list]]){
    const g = $(id);
    g.addEventListener('pointerdown', e => {
      e.preventDefault(); g.setPointerCapture(e.pointerId); g.classList.add('on');
      const m = mk(), z = +document.body.style.zoom || 1, start = m.vert ? e.clientY : e.clientX;
      const r = m.el.getBoundingClientRect(), base = (m.vert ? r.height : r.width) / z, H = $('.cols').getBoundingClientRect().height / z;
      const mv = ev => {
        const d = ((m.vert ? ev.clientY : ev.clientX) - start) / z;
        if (m.vert){ const pct = Math.max(20, Math.min(80, (base + d) / H * 100)); root.style.setProperty(m.prop, pct + '%'); store.set(m.key, pct.toFixed(1)); }
        else { const w = Math.max(m.min, Math.min(m.max, base + d)); root.style.setProperty(m.prop, w + 'px'); store.set(m.key, Math.round(w)); }
      };
      const up = () => { g.classList.remove('on'); g.removeEventListener('pointermove', mv); g.removeEventListener('pointerup', up); };
      g.addEventListener('pointermove', mv); g.addEventListener('pointerup', up);
    });
    g.addEventListener('dblclick', () => { const m = mk(); root.style.removeProperty(m.prop); store.del(m.key); });
  }
})();

/* ================= Boutons de la barre du haut ================= */
$('#compose').onclick = () => openComposer();
$('#setBtn').onclick = () => openSettings();
$('#heartBtn').onclick = () => openSupport();
$('#addAccBtn').onclick = () => { setDrawer(false); openAddAccount(); };
$('#sideBtn').onclick = () => { if (isSmall()) return setDrawer(!document.documentElement.classList.contains('drawer')); SET.side = SET.side === 'hidden' ? 'shown' : 'hidden'; applySettings(); };
$('#drawerBack').onclick = () => setDrawer(false);
$('#refreshBtn').onclick = () => refreshAll();
async function refreshAll(){
  const b = $('#refreshBtn'); b.animate([{ transform:'rotate(0)' }, { transform:'rotate(360deg)' }], { duration: 600 });
  await Promise.all([loadAllFolders(), ST.search ? runSearch(ST.search) : refreshList()]);
}

/* ================= Événements de l’application ================= */
if (N){
  N.on('new-mail', ({ acc, items }) => {
    items = (items || []).filter(i => !(i.from && i.from[0] && isBlockedAddr(i.from[0].address)));
    refreshFoldersSoon(acc, 300);
    const v = ST.view;
    if (v && !ST.search && (v.uni || (v.acc === acc && v.box === 'INBOX'))) refreshList();
    if (!document.hasFocus() && items && items.length){
      if (items.length > 2) N.notify({ title: T(`${items.length} nouveaux messages`), body: items.slice(0, 3).map(i => nameOf(i.from && i.from[0])).join(', '), key: items[0].key });
      else items.forEach(i => N.notify({ title: nameOf(i.from && i.from[0]) || T('Nouveau message'), body: i.subject || T('(sans objet)'), key: i.key }));
    }
  });
  N.on('mailto', url => { if (url === 'mailto:') openComposer(); else composeMailto(url); });
  N.on('open-key', async key => {
    const [acc] = key.split('|');
    if (!ST.view || !(ST.view.uni || (ST.view.acc === acc && ST.view.box === 'INBOX'))) await openView({ acc, box: 'INBOX' });
    else await refreshList();
    if (itemOf(key)) openMsg(key);
  });
}
setInterval(() => { if (ST.accounts.length) loadAllFolders(); }, 3 * 60000);
setInterval(() => { if (ST.view && !ST.search && !document.hidden) refreshList(); }, 5 * 60000);
window.addEventListener('focus', () => { if (ST.view && !ST.search && Date.now() - (window._lastF || 0) > 60000){ window._lastF = Date.now(); refreshList(); } });

/* ================= Mises à jour (sans réinstaller) ================= */
let UPD = { state: 'idle' }, updPaint = null;
function updHTML(){
  const s = UPD, n = s.next || '';
  const row = (t, sub, btn) => `<div class="updbox">${ic(s.state === 'ready' || s.state === 'available' ? 'download' : s.state === 'error' ? 'info' : 'check')}<span>${t}${sub ? `<small>${sub}</small>` : ''}</span>${btn || ''}</div>`;
  const chk = '<button class="btn ghost" data-uact="check">Rechercher</button>';
  switch (s.state){
    case 'store': case 'off': return row('Mises à jour automatiques', s.mode === 'dev' ? 'Désactivées en mode développement' : 'Assurées par le Microsoft Store');
    case 'checking': return row('Recherche d’une mise à jour…');
    case 'uptodate': return row('Hamama est à jour', 'Les nouvelles versions s’installent toutes seules, sans réinstaller.', chk);
    case 'downloading': return row(`Téléchargement de la version ${esc(n)}… ${s.percent || 0} %`, 'Tu peux continuer à utiliser Hamama.');
    case 'ready': return row(`Version ${esc(n)} prête`, 'Un simple redémarrage de Hamama suffit.', '<button class="btn primary" data-uact="install">Redémarrer</button>');
    case 'available': return row(`Version ${esc(n)} disponible`, 'Version portable : télécharge le nouveau fichier.', '<button class="btn primary" data-uact="install">Télécharger</button>');
    case 'error': return row('Impossible de vérifier les mises à jour', esc(s.err || 'Pas de connexion ?'), chk);
    default: return row('Mises à jour automatiques', 'Vérification au démarrage puis toutes les 30 minutes.', chk);
  }
}
function renderUpd(){
  const b = $('#updBtn'), st = UPD.state, show = st === 'ready' || st === 'available';
  b.classList.toggle('hidden', !show);
  b.querySelector('span').textContent = st === 'ready' ? 'Mettre à jour' : 'Nouvelle version';
  b.dataset.tip = st === 'ready' ? `Version ${UPD.next} prête : Hamama redémarre en quelques secondes` : `Hamama ${UPD.next || ''} est disponible`;
  if (updPaint) updPaint();
}
async function installUpdate(){
  if (CMP && CMP.dirty) await closeComposer('save', true);
  try { await N.update.install(); } catch (e) { errToast(e); }
}
$('#updBtn').onclick = installUpdate;
if (N && N.update){
  N.on('update', s => { const was = UPD.state; UPD = s; renderUpd(); if (s.state === 'ready' && was !== 'ready') toast(`Nouvelle version ${s.next} prête`, { label: 'Mettre à jour', fn: installUpdate }, 10000); });
  N.update.state().then(s => { if (s && s.state){ UPD = s; renderUpd(); } }).catch(() => {});
}

/* ================= Démarrage ================= */
async function start(){
  if (!N){ document.body.innerHTML = '<div style="padding:40px;font:16px Inter,sans-serif;color:#e8eaf0">Hamama fonctionne dans son application Windows ou Mac.</div>'; return; }
  showEmptyView();
  try { ST.blocked = await N.block.list(); } catch {}
  await reloadAccounts();
  if (ST.accounts.length) await openDefault();
  N.ready();
  applySettings.spell = SET.spell; N.prefs({ lang: LANG, spell: SET.spell }).catch(() => {});
  const pend = J('hamama-compose', null);
  if (pend && (pend.html || pend.subject)) toast('Un message non envoyé a été récupéré', { label: 'Ouvrir', fn: () => openComposer({ ...pend, atts: restoreAtts(pend.atts) }) }, 12000);
  if (location.search.includes('debug')) window.__hamama = { ST, SET, openMsg, openView, act, openComposer, openSettings, refreshList };
}
start();
})();
