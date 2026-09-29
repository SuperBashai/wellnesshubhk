"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { ImagePlus, MessageSquare, Star, X } from "lucide-react";
import type { Locale } from "@/lib/data";

type Review = {
  id: string;
  name: string;
  rating: number;
  body: string;
  createdAt: string;
  images?: string[];
};

const MAX_REVIEW_IMAGES = 3;
const MAX_SOURCE_IMAGE_BYTES = 10 * 1024 * 1024;

const copy = {
  en: {
    eyebrow: "Community notes",
    title: "What visitors think",
    intro: "Share a useful, first-hand perspective to help other people plan their visit.",
    count: "reviews",
    review: "review",
    noRating: "No rating yet",
    emptyTitle: "Be the first to review this venue.",
    emptyBody: "Visited recently? Share what stood out, what to expect and who you think it suits.",
    formTitle: "Write a review",
    ratingLabel: "Your rating",
    nameLabel: "Name or nickname",
    namePlaceholder: "How should your name appear?",
    bodyLabel: "Your experience",
    bodyPlaceholder: "What should another visitor know?",
    submit: "Publish review",
    saved: "Your review has been added.",
    photosLabel: "Add photos",
    photosHint: "Up to 3 JPG, PNG or WebP images. We resize them before saving.",
    choosePhotos: "Choose images",
    removePhoto: "Remove image",
    photoAlt: "Photo shared with this review",
    processing: "Preparing images…",
    tooManyPhotos: "You can add up to 3 images to one review.",
    unsupportedPhoto: "Please choose JPG, PNG or WebP images.",
    photoTooLarge: "Each original image must be smaller than 10 MB.",
    photoError: "One of the images could not be prepared. Please try another file.",
    saveError: "This browser does not have enough storage for these images. Try fewer or smaller images.",
    localNote: "Local preview: reviews are saved only in this browser. Shared publishing and moderation will be connected before launch.",
    star: "star",
  },
  "zh-hk": {
    eyebrow: "社群分享",
    title: "訪客點樣睇",
    intro: "分享親身體驗，幫其他人更容易安排到訪。",
    count: "則評價",
    review: "則評價",
    noRating: "暫時未有評分",
    emptyTitle: "成為第一個評價呢個場地嘅訪客。",
    emptyBody: "最近去過？分享最深刻嘅地方、到訪前要知道嘅事，同適合邊類人。",
    formTitle: "撰寫評價",
    ratingLabel: "你嘅評分",
    nameLabel: "名稱或暱稱",
    namePlaceholder: "想點樣顯示你嘅名稱？",
    bodyLabel: "你嘅體驗",
    bodyPlaceholder: "其他訪客有咩需要知道？",
    submit: "發表評價",
    saved: "你嘅評價已經加入。",
    photosLabel: "加入相片",
    photosHint: "最多 3 張 JPG、PNG 或 WebP；儲存前會自動縮細。",
    choosePhotos: "選擇相片",
    removePhoto: "移除相片",
    photoAlt: "隨評價分享嘅相片",
    processing: "正在處理相片…",
    tooManyPhotos: "每則評價最多可以加入 3 張相片。",
    unsupportedPhoto: "請選擇 JPG、PNG 或 WebP 相片。",
    photoTooLarge: "每張原相必須細過 10 MB。",
    photoError: "其中一張相片未能處理，請試另一個檔案。",
    saveError: "瀏覽器儲存空間不足，請減少相片數量或選擇較細嘅相片。",
    localNote: "本地預覽：評價暫時只儲存喺呢個瀏覽器。正式推出前會接駁共用資料庫及審核系統。",
    star: "星",
  },
} as const;

function isReview(value: unknown): value is Review {
  if (!value || typeof value !== "object") return false;
  const review = value as Partial<Review>;
  const validImages = review.images === undefined || (Array.isArray(review.images) && review.images.every((image) => typeof image === "string" && image.startsWith("data:image/")));
  return typeof review.id === "string" && typeof review.name === "string" && typeof review.body === "string" && typeof review.createdAt === "string" && typeof review.rating === "number" && review.rating >= 1 && review.rating <= 5 && validImages;
}

function prepareReviewImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const maxDimension = 1200;
        const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext("2d");
        if (!context) return reject(new Error("Canvas is unavailable"));
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        let quality = .8;
        let output = canvas.toDataURL("image/jpeg", quality);
        while (output.length > 900_000 && quality > .5) {
          quality -= .1;
          output = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(output);
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export function VenueReviews({ locale, slug, venueName }: { locale: Locale; slug: string; venueName: string }) {
  const t = copy[locale];
  const storageKey = `well-hk:venue-reviews:v1:${slug}`;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [processingImages, setProcessingImages] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      const parsed: unknown = stored ? JSON.parse(stored) : [];
      if (Array.isArray(parsed)) setReviews(parsed.filter(isReview));
    } catch {
      setReviews([]);
    }
  }, [storageKey]);

  const average = useMemo(() => reviews.length ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : 0, [reviews]);
  const valid = rating > 0 && name.trim().length >= 2 && body.trim().length >= 10 && !processingImages;

  async function addImages(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    setSaved(false);
    setFormMessage("");
    if (!files.length) return;
    if (images.length + files.length > MAX_REVIEW_IMAGES) {
      setFormMessage(t.tooManyPhotos);
      return;
    }
    if (files.some((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type))) {
      setFormMessage(t.unsupportedPhoto);
      return;
    }
    if (files.some((file) => file.size > MAX_SOURCE_IMAGE_BYTES)) {
      setFormMessage(t.photoTooLarge);
      return;
    }
    setProcessingImages(true);
    try {
      const prepared = await Promise.all(files.map(prepareReviewImage));
      setImages((current) => [...current, ...prepared].slice(0, MAX_REVIEW_IMAGES));
    } catch {
      setFormMessage(t.photoError);
    } finally {
      setProcessingImages(false);
    }
  }

  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid) return;
    const review: Review = {
      id: typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}`,
      name: name.trim(),
      rating,
      body: body.trim(),
      createdAt: new Date().toISOString(),
      images,
    };
    const updated = [review, ...reviews];
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      setSaved(false);
      setFormMessage(t.saveError);
      return;
    }
    setReviews(updated);
    setRating(0);
    setName("");
    setBody("");
    setImages([]);
    setFormMessage("");
    setSaved(true);
  }

  return (
    <section className="venue-reviews section" id="reviews" aria-labelledby="venue-reviews-title">
      <div className="shell">
        <div className="venue-reviews-grid">
          <div className="venue-reviews-intro">
            <span className="eyebrow"><span />{t.eyebrow}</span>
            <h2 id="venue-reviews-title">{t.title}</h2>
            <p>{t.intro}</p>
            <div className="venue-rating-summary">
              <strong>{reviews.length ? average.toFixed(1) : "—"}</strong>
              <div><span className="review-stars" aria-label={reviews.length ? `${average.toFixed(1)} / 5` : t.noRating}>{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={18} fill={reviews.length && star <= Math.round(average) ? "currentColor" : "none"} />)}</span><small>{reviews.length ? `${reviews.length} ${reviews.length === 1 ? t.review : t.count}` : t.noRating}</small></div>
            </div>
          </div>

          <form className="venue-review-form" aria-label={`${t.formTitle}: ${venueName}`} onSubmit={submitReview}>
            <div className="review-form-heading"><MessageSquare size={21} /><h3>{t.formTitle}</h3></div>
            <fieldset><legend>{t.ratingLabel}</legend><div className="review-rating-input">{[1, 2, 3, 4, 5].map((star) => <button type="button" key={star} aria-label={`${star} ${t.star}`} aria-pressed={rating === star} onClick={() => { setRating(star); setSaved(false); }}><Star size={25} fill={star <= rating ? "currentColor" : "none"} /></button>)}</div></fieldset>
            <label><span>{t.nameLabel}</span><input value={name} maxLength={40} placeholder={t.namePlaceholder} onChange={(event) => { setName(event.target.value); setSaved(false); }} /></label>
            <label><span>{t.bodyLabel}</span><textarea value={body} maxLength={600} rows={5} placeholder={t.bodyPlaceholder} onChange={(event) => { setBody(event.target.value); setSaved(false); }} /></label>
            <div className="review-photo-field">
              <span>{t.photosLabel}</span>
              <div className="review-photo-actions">
                <label className="review-photo-picker">
                  <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={addImages} disabled={processingImages || images.length >= MAX_REVIEW_IMAGES} />
                  <ImagePlus size={18} /><strong>{processingImages ? t.processing : t.choosePhotos}</strong>
                </label>
                <small>{images.length} / {MAX_REVIEW_IMAGES}</small>
              </div>
              <p>{t.photosHint}</p>
              {images.length > 0 && <div className="review-photo-previews">{images.map((image, index) => <figure key={`${image.slice(-24)}-${index}`}>
                {/* User-selected local preview. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={`${t.photoAlt} ${index + 1}`} />
                <button type="button" aria-label={`${t.removePhoto} ${index + 1}`} onClick={() => { setImages((current) => current.filter((_, imageIndex) => imageIndex !== index)); setSaved(false); setFormMessage(""); }}><X size={15} /></button>
              </figure>)}</div>}
            </div>
            <div className="review-form-footer"><small>{body.length} / 600</small><button type="submit" disabled={!valid}>{t.submit}</button></div>
            <p className={`review-save-message${formMessage ? " is-error" : ""}`} aria-live="polite">{formMessage || (saved ? t.saved : "")}</p>
            <p className="review-local-note">{t.localNote}</p>
          </form>
        </div>

        <div className="venue-review-list">
          {reviews.length ? reviews.map((review) => <article key={review.id}>
            <div className="review-author"><span>{review.name.slice(0, 1).toLocaleUpperCase()}</span><div><strong>{review.name}</strong><small>{new Intl.DateTimeFormat(locale === "en" ? "en-HK" : "zh-HK", { year: "numeric", month: "short", day: "numeric" }).format(new Date(review.createdAt))}</small></div></div>
            <span className="review-stars" aria-label={`${review.rating} / 5`}>{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} fill={star <= review.rating ? "currentColor" : "none"} />)}</span>
            <div className="review-content"><p>{review.body}</p>{review.images?.length ? <div className="review-photo-gallery">{review.images.map((image, index) => <figure key={`${review.id}-${index}`}>
              {/* User-submitted image saved in this browser. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={`${t.photoAlt} ${index + 1}`} />
            </figure>)}</div> : null}</div>
          </article>) : <div className="review-empty"><MessageSquare size={27} /><div><h3>{t.emptyTitle}</h3><p>{t.emptyBody}</p></div></div>}
        </div>
      </div>
    </section>
  );
}
