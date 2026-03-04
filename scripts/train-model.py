"""
ChiliHub Disease Detection Model — Training Script
====================================================

This script trains a MobileNetV2-based model for chili disease classification
using transfer learning, then exports it to TensorFlow.js format.

Dataset Structure:
------------------
Create a folder called 'dataset/' in the project root with subfolders for each class:

  dataset/
    anthracnose/
      img001.jpg
      img002.jpg
      ...
    bacterial_wilt/
      img001.jpg
      ...
    cercospora_leaf_spot/
    fusarium_wilt/
    healthy/
    leaf_curl/
    mosaic_virus/
    nutrient_deficiency/
    phytophthora/
    powdery_mildew/

Aim for 200-500 images per class. You can collect images from:
  - PlantVillage dataset (Kaggle)
  - iNaturalist
  - Google Images (manual curation)
  - Your own field photos

How to Run:
-----------
1. Install dependencies:
   pip install tensorflow tensorflowjs Pillow

2. Prepare dataset as described above.

3. Run training:
   python scripts/train-model.py

4. The exported model will be saved to public/model/
   (model.json + weight shard files)

5. The Next.js app will load the model from /model/model.json
"""

import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau

# --- Configuration ---
DATASET_DIR = os.path.join(os.path.dirname(__file__), '..', 'dataset')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'model')
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 30
NUM_CLASSES = 10

CLASS_NAMES = [
    'anthracnose',
    'bacterial_wilt',
    'cercospora_leaf_spot',
    'fusarium_wilt',
    'healthy',
    'leaf_curl',
    'mosaic_virus',
    'nutrient_deficiency',
    'phytophthora',
    'powdery_mildew',
]

def create_data_generators():
    """Create training and validation data generators with augmentation."""
    train_datagen = ImageDataGenerator(
        rescale=1.0 / 255,
        rotation_range=30,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        vertical_flip=False,
        fill_mode='nearest',
        validation_split=0.2,
    )

    train_generator = train_datagen.flow_from_directory(
        DATASET_DIR,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        classes=CLASS_NAMES,
        subset='training',
        shuffle=True,
    )

    val_generator = train_datagen.flow_from_directory(
        DATASET_DIR,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        classes=CLASS_NAMES,
        subset='validation',
        shuffle=False,
    )

    return train_generator, val_generator


def build_model():
    """Build MobileNetV2 transfer learning model."""
    base_model = MobileNetV2(
        weights='imagenet',
        include_top=False,
        input_shape=(224, 224, 3),
    )

    # Freeze base model layers
    base_model.trainable = False

    # Add custom classification head
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.3)(x)
    predictions = Dense(NUM_CLASSES, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=predictions)

    model.compile(
        optimizer=Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy'],
    )

    return model, base_model


def fine_tune_model(model, base_model):
    """Unfreeze top layers and fine-tune with lower learning rate."""
    base_model.trainable = True

    # Freeze all layers except the last 30
    for layer in base_model.layers[:-30]:
        layer.trainable = False

    model.compile(
        optimizer=Adam(learning_rate=0.0001),
        loss='categorical_crossentropy',
        metrics=['accuracy'],
    )

    return model


def main():
    print("=" * 60)
    print("ChiliHub Disease Detection Model Training")
    print("=" * 60)

    # Check dataset exists
    if not os.path.exists(DATASET_DIR):
        print(f"\nError: Dataset directory not found at {DATASET_DIR}")
        print("Please create the dataset directory with class subfolders.")
        print("See the docstring at the top of this file for instructions.")
        return

    # Create data generators
    print("\n[1/5] Loading dataset...")
    train_gen, val_gen = create_data_generators()
    print(f"  Training samples: {train_gen.samples}")
    print(f"  Validation samples: {val_gen.samples}")
    print(f"  Classes: {list(train_gen.class_indices.keys())}")

    # Build model
    print("\n[2/5] Building MobileNetV2 model...")
    model, base_model = build_model()
    model.summary()

    # Callbacks
    callbacks = [
        EarlyStopping(
            monitor='val_loss',
            patience=5,
            restore_best_weights=True,
        ),
        ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=3,
            min_lr=1e-7,
        ),
    ]

    # Phase 1: Train classification head
    print("\n[3/5] Phase 1: Training classification head...")
    model.fit(
        train_gen,
        validation_data=val_gen,
        epochs=10,
        callbacks=callbacks,
    )

    # Phase 2: Fine-tune top layers
    print("\n[4/5] Phase 2: Fine-tuning top layers...")
    model = fine_tune_model(model, base_model)
    model.fit(
        train_gen,
        validation_data=val_gen,
        epochs=EPOCHS,
        callbacks=callbacks,
    )

    # Evaluate
    val_loss, val_acc = model.evaluate(val_gen)
    print(f"\n  Final validation accuracy: {val_acc:.4f}")
    print(f"  Final validation loss: {val_loss:.4f}")

    # Save as Keras model
    keras_path = os.path.join(OUTPUT_DIR, 'model.keras')
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    model.save(keras_path)
    print(f"\n  Keras model saved to: {keras_path}")

    # Convert to TensorFlow.js
    print("\n[5/5] Converting to TensorFlow.js format...")
    try:
        import tensorflowjs as tfjs
        tfjs.converters.save_keras_model(model, OUTPUT_DIR)
        print(f"  TF.js model saved to: {OUTPUT_DIR}")
        print(f"  Model files: model.json + weight shard(s)")
    except ImportError:
        print("  Warning: tensorflowjs not installed.")
        print("  Run: pip install tensorflowjs")
        print("  Then convert manually:")
        print(f"    tensorflowjs_converter --input_format=keras {keras_path} {OUTPUT_DIR}")

    print("\n" + "=" * 60)
    print("Training complete!")
    print(f"Copy the contents of {OUTPUT_DIR} to your Next.js public/model/ directory.")
    print("=" * 60)


if __name__ == '__main__':
    main()
