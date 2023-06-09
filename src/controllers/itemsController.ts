import { Response, Request } from "express";
import { IItems } from "../types/itemsType";
import { Items } from "../models/itemsModel";
import { ICounters } from "../types/countersType";
import { Counters } from "../models/countersModel";

const addItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IItems, keyof IItems>;
    const allCounter: ICounters[] = await Counters.find();
    const { itemCount } = allCounter[0];
    const id = (itemCount ?? 0) + 1;
    const _id = allCounter[0]._id;
    const updateItemCount = await Counters.findByIdAndUpdate<ICounters | null>({ _id: _id }, { itemCount: id });
    const item: IItems = new Items({
      id: id,
      name: body.name,
      quantity: body.quantity,
      unitPrice: body.unitPrice,
      createdAt: body.createdAt,
      createdBy: body.createdBy,
      creatorId: body.creatorId,
    });

    const newItem: IItems = await item.save();
    const allItems: IItems[] = await Items.find();

    res.status(201).json({ message: "Item has been added", item: newItem, items: allItems });
  } catch (error) {
    throw error;
  }
};

const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const allItems: IItems[] = await Items.find();
    res.status(200).json({ allItems });
  } catch (error) {
    throw error;
  }
};

const updateItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const item: IItems = new Items({
      name: body.name,
      quantity: body.quantity,
      unitPrice: body.unitPrice,
    });
    await Items.updateOne<IItems | null>(
      { id: body.id },
      {
        $set: { name: item.name, quantity: item.quantity, unitPrice: item.unitPrice },
      }
    );
    const allItems: IItems[] = await Items.find();
    res.status(200).json({
      message: "Item has been updated",
      items: allItems,
    });
  } catch (error) {
    throw error;
  }
};

const deleteItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    await Items.deleteOne({ id: body.id });
    const allItems: IItems[] = await Items.find();
    res.status(200).json({
      message: "Item has been deleted",
      items: allItems,
    });
  } catch (error) {
    throw error;
  }
};

export { addItems, getItems, updateItems, deleteItems };
